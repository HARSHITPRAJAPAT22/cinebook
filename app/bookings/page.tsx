'use client';

import { use, useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import QRCode from 'qrcode';
import { Booking } from '@/lib/models/model';
import BookingCard from '@/components/BookingCard';
import Link from 'next/link';

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketHtml, setTicketHtml] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [movieId , setMovieId] = useState<string | null>(null);
  const [movieTitle, setMovieTitle] = useState<string>('Movie');
  const [description, setDescription] = useState<string>('No description available');
  const [imageUrl, setImageUrl] = useState<string>('https://via.placeholder.com/150');
  const [bookingAmount, setBookingAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch('/api/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cinebook_token')}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setName(data.user?.name || 'Guest');
      setDate(data.user?.date 
        ? new Date(data.user.date).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
          }) 
        : new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
          })
      );

      const bookings = Array.isArray(data.user?.bookings) ? data.user.bookings : [];

      // Fetch payment details for each booking
      const bookingsWithPayment = await Promise.all(
        bookings.map(async (booking: Booking) => {
          try {
            const paymentRes = await fetch(`/api/payment/${booking.paymentId}`);
            if (paymentRes.ok) {
              const paymentData = await paymentRes.json();
              return { ...booking, payment: paymentData };
            }
          } catch (e) {}
          return { ...booking, payment: null };
        })
      );

      setBookings(bookingsWithPayment);
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const fetchMovieTitle = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=328aa2fcc30517cb12a60920c82d1f97&language=hi-IN`
        );

        if (response.ok) {
          const data = await response.json();
          setMovieTitle(data.original_title);
          setImageUrl(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
        }
      } catch (error) {
        console.error('Error fetching movie title:', error);
        setMovieTitle('Movie');
    };

    fetchMovieTitle();
  }}, []);
  const statusOptions = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];

  const filteredBookings = bookings.filter(booking => {
    return statusFilter === 'All' || booking.status === statusFilter;
  });

  // Sort bookings by bookingDate descending (newest first)
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(a.bookingDate).getTime();
    const dateB = new Date(b.bookingDate).getTime();
    return dateB - dateA;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadTicket = async (booking: typeof bookings[0]) => {

    const qrData = JSON.stringify({
      bookingId: booking.id,
      movie: movieTitle,
      theater: description,
      bookingDate : booking.bookingDate,
      date: booking.showDate,
      time: booking.showTime,
      seats: booking.seats,
      user: "",
      status: booking.status,
      amount: booking.amount,
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    const logoUrl = "/logo.png";
    //@ts-ignore
    const amount = booking.payment?.amount ? booking.payment.amount / 100 : booking.amount;

    const html = `
      <div style="
        background: linear-gradient(135deg, #fff 60%, #c32f2f 100%);
        border-radius: 24px;
        box-shadow: 0 8px 32px #c32f2f22;
        padding: 32px 24px;
        max-width: 400px;
        margin: 32px auto;
        font-family: 'Inter', Arial, sans-serif;
        color: #222;
        position: relative;
      ">
        <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:24px;">
          <img src="${logoUrl}" alt="Cinebook Logo" width="60" height="60" style="margin-bottom:12px;border-radius:12px;box-shadow:0 2px 8px #c32f2f33;" />
          <img src="${qrCodeUrl}" alt="QR Code" width="100" height="100" style="margin-bottom:16px;border-radius:12px;box-shadow:0 2px 8px #c32f2f33;" />
        </div>
        <div style="font-size:2rem;font-weight:800;color:#c32f2f;margin-bottom:8px;text-align:center;">${movieTitle}</div>
        
        <div style="margin-bottom:8px;"><span style="font-weight:600;">Booking ID:</span> ${booking.id}</div>
        <div style="margin-bottom:8px;"><span style="font-weight:600;">Date & Time:</span> ${booking.showDate} at ${booking.showTime}</div>
        <div style="margin-bottom:8px;"><span style="font-weight:600;">Seats:</span> ${booking.seats.join(', ')}</div>
        <div style="margin-bottom:8px;"><span style="font-weight:600;">Amount Paid:</span> ₹${amount}</div>
        <div style="margin-bottom:8px;"><span style="font-weight:600;">Status:</span> <span style="color:#c32f2f;font-weight:700;">${booking.status}</span></div>
        <div style="margin-bottom:8px;"><span style="font-weight:600;">User:</span> ${name}</div>
        <div style="margin-bottom:8px;"><span style="font-weight:600;">Payment Time:</span> ${date}</div>
        <div style="margin-top:24px;text-align:center;">
          <span style="font-size:0.9rem;color:#888;">Show this QR code at the theater entrance</span>
        </div>
        <div style="position:absolute;top:0;right:0;width:60px;height:60px;background:#c32f2f22;border-bottom-left-radius:24px;"></div>
        <div style="position:absolute;bottom:0;left:0;width:60px;height:60px;background:#c32f2f22;border-top-right-radius:24px;"></div>
      </div>
    `;

    setTicketHtml(html);
    setShowTicketModal(true);

    // For download/print
    const win: Window | null = window.open("", "_blank");
    if (win) {
      win.document.write(`<html><head><title>Movie Ticket</title></head><body>${html}</body></html>`);
      win.document.close();
      win.focus();
      win.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your movie ticket reservations</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              Total Bookings: {sortedBookings.length}
            </div>
          </div>
        </div>
        
        {sortedBookings.length > 0 ? (
          <div className="space-y-6">
            {sortedBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                movieId={booking.movieId}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                selectedBooking={selectedBooking}
                setSelectedBooking={setSelectedBooking}
                handleDownloadTicket={handleDownloadTicket}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <i className="ri-ticket-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">You haven't made any bookings yet</p>
            <Link
              href="/movies"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
      
  
      {showTicketModal && ticketHtml && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowTicketModal(false)}
            >
              &times;
            </button>
            <div dangerouslySetInnerHTML={{ __html: ticketHtml }} />
          </div>
        </div>
      )}
    </div>
  );
}