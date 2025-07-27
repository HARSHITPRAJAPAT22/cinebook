'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';
import type { Booking } from '@/lib/models/model';
import { toast } from 'react-toastify';

interface BookingPageProps {
  movieId: string;
}

function BookingContent({ movieId }: BookingPageProps) {
  const searchParams = useSearchParams();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [theaterName, setTheaterName] = useState('not found');

  // New state for modal
  const [showDateTimeModal, setShowDateTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('User');
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  const theaterId = searchParams.get('theaterId');
  const movieIdParam = searchParams.get('movieId');
  const dateParam = searchParams.get('date');
  const timeParam = searchParams.get('time');


  const effectiveDate = dateParam || selectedDate;
  const effectiveTime = timeParam || selectedTime;


  const effectiveMovieId = movieIdParam || movieId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('cinebook_token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setName(data.user?.name || 'User');
          setId(data.user?._id || '');
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (theaterId && effectiveMovieId && !dateParam && !timeParam) {
      setShowDateTimeModal(true);
    }
  }, [theaterId, effectiveMovieId, dateParam, timeParam]);

  useEffect(() => {
    const fetchMovieTitle = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=328aa2fcc30517cb12a60920c82d1f97&language=en-US`
        );
        
        if (response.ok) {
          const data = await response.json();
          setMovieTitle(data.title);
          setImageUrl(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
        }
      } catch (error) {
        console.error('Error fetching movie title:', error);
        setMovieTitle('Movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieTitle();
  }, []);
  useEffect(()=>{
    if (theaterId) {
      const fetchTheater = async () => {
        try {
          const overpassQuery = `
            [out:json];
            (
              node["amenity"="cinema"](id:${theaterId});
              way["amenity"="cinema"](id:${theaterId});
            );
            out center;
          `;
          const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: overpassQuery,
            headers: { 'Content-Type': 'text/plain' }
          });
          if (response.ok) {
            const data = await response.json();
            const theaters = (data.elements || []);
            if (theaters.length > 0) {
              const theater = theaters[0];
              setTheaterName(theater.tags?.name || 'Theater'); 
            }
          }
        } catch (error) {
          console.error('Error fetching theater:', error);
        }
      };
      fetchTheater();
    }
  },[])
  async function saveBookingToBackend(userId: string, booking: Booking) {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cinebook_token')}`
       },
      body: JSON.stringify({
        userId,
        booking
      })
    });
     const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchOccupiedSeats() {
      if (theaterId && effectiveDate && effectiveTime) {
        try {
          const res = await fetch(
            `/api/theator?theatorId=${theaterId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('cinebook_token')}`
              }
            }
          );
          if (res.ok) {
            const data = await res.json();
            // Get occupied seats for selected date and time
            const booked =
              data.theater?.bookedSeats?.[effectiveDate]?.[effectiveTime] || [];

              setOccupiedSeats(booked);
          }
        } catch (error) {
          console.error('Error fetching occupied seats:', error);
        }
      }
    }
    fetchOccupiedSeats();
  }, [theaterId, effectiveDate, effectiveTime]);

  const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;

    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const isOccupied = occupiedSeats.includes(seatId);
        seats.push({
          id: seatId,
          row,
          number: i,
          isOccupied,
          isSelected: selectedSeats.includes(seatId)
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalPrice = selectedSeats.length * 300;

  const handleProceedToPayment = () => {
    if (selectedSeats.length > 0) {
      setShowPayment(true);
    }
  };

  const dateOptions = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const value = d.toISOString().slice(0, 10);
    let label;
    if (i === 0) label = 'Today';
    else if (i === 1) label = 'Tomorrow';
    else label = d.toLocaleDateString(undefined, { weekday: 'long' });
    return { value, label };
  });
  const timeOptions = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      window.location.href = `/booking/${effectiveMovieId}?theaterId=${theaterId}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}`;
    }
  };

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    const isLoggedIn = typeof window !== 'undefined' && !!window.localStorage.getItem('cinebook_token');
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    if (selectedSeats.length === 0) return;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: totalPrice * 100,
      currency: "INR",
      name: name,
      description: `Booking for ${selectedSeats.length} seat(s) at ${theaterName}`,
      image: "/favicon.png",
      handler: async function (response: any) {
        toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        try {
          const booking: Booking = {
            movieId: effectiveMovieId,
            theaterId: theaterId || '',
            seats: selectedSeats,
            showDate: dateParam || '',
            bookingDate: new Date().toISOString(),
            showTime: timeParam || '',
            paymentId: response.razorpay_payment_id,
            status: 'confirmed',
            id: id,
            image: imageUrl
          };
          await saveBookingToBackend(id, booking);
          window.location.href = `/bookings`;
        } catch (err) {
          toast.error("Failed to save booking!");
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#c32f2f"
      },
      modal: {
        ondismiss: async function () {
          // Payment was cancelled or failed
          const booking: Booking = {
            movieId: effectiveMovieId,
            theaterId: theaterId || '',
            seats: selectedSeats,
            showDate: dateParam || '',
            bookingDate: new Date().toISOString(),
            showTime: timeParam || '',
            paymentId: '', // No payment id
            status: 'cancelled',
            id: id,
            image: imageUrl
          };
          await saveBookingToBackend(id, booking);
          window.location.href = `/bookings`;
          toast.error("Payment was cancelled or failed. Booking marked as cancelled.");
        }
      }
    };

    if (!(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } else {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading booking details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      {/* Date/Time Modal */}
      {showDateTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Select Date & Time</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Date</label>
              <select
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select date</option>
                {dateOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Time</label>
              <select
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select time</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleDateTimeConfirm}
                disabled={!selectedDate || !selectedTime}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  selectedDate && selectedTime
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDateTimeModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Select Seats</h1>
            <Link
              href={`/movie/${movieId}`}
              className="text-red-600 hover:text-red-700 transition-colors"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-arrow-left-line text-xl"></i>
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold">Movie:</span> {movieTitle}
            </div>
            <div>
              <span className="font-semibold">Theater:</span> {theaterName}
            </div>
            <div>
              <span className="font-semibold">Time:</span> {searchParams.get('time') || '6:00 PM'}
            </div>
          </div>
        </div>

        {showPayment ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Movie:</span>
                  <span>{movieTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Theater:</span>
                  <span>{theaterName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{searchParams.get('time') || '6:00 PM'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seats:</span>
                  <span>{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{selectedSeats.length} ticket(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per ticket:</span>
                  <span>₹300</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-red-600">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleRazorpayPayment}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Pay with Razorpay
              </button>
              <button
                onClick={() => setShowPayment(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Back to Seat Selection
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-full h-4 bg-gray-800 rounded-t-lg mb-2"></div>
                <p className="text-sm text-gray-600">SCREEN</p>
              </div>
              
              <div className="grid grid-cols-12 gap-1 mb-6">
                {seats.map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => !seat.isOccupied && handleSeatClick(seat.id)}
                    disabled={seat.isOccupied}
                    className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                      seat.isOccupied
                        ? 'bg-red-300 text-red-800 cursor-not-allowed'
                        : seat.isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-300 rounded"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Booking Summary</h3>
                  <p className="text-sm text-gray-600">
                    {selectedSeats.length} seat(s) selected: {selectedSeats.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">₹{totalPrice}</p>
                  <p className="text-sm text-gray-600">₹300 per seat</p>
                </div>
              </div>
              
              <button
                onClick={handleProceedToPayment}
                disabled={selectedSeats.length === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  selectedSeats.length > 0
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default function Booking({ params }: { params: { id: string } }) {
  return <BookingContent movieId={params.id} />;
}
