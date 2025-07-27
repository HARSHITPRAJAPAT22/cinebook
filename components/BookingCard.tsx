import React from 'react';
import { Booking } from '@/lib/models/model';
import { useEffect } from 'react';
import { cn } from '@/lib/utils'

interface BookingCardProps {
  booking: Booking;
  movieId?: string;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  selectedBooking: string | null;
  setSelectedBooking: (id: string | null) => void;
  handleDownloadTicket: (booking: Booking) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  movieId = '',
  formatDate,
  getStatusColor,
  selectedBooking,
  setSelectedBooking,
  handleDownloadTicket,
}) => {

    const [movieTitle, setMovieTitle] = React.useState<string>('Movie');
    const [imageUrl, setImageUrl] = React.useState<string>('https://via.placeholder.com/150');
    const [bookingAmount, setBookingAmount] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>('No description available');
    useEffect(()=>{
        const fetchMovieTitle = async ()=>{
            try{
                 const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=328aa2fcc30517cb12a60920c82d1f97&language=en-US`
        );

        if (response.ok) {
          const data = await response.json();
          setMovieTitle(data.original_title);
          setImageUrl(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
        }
      } catch (error) {
        console.error('Error fetching movie title:', error);
        setMovieTitle('Movie');
      }
    };

    fetchMovieTitle();
  }, [movieId]);

useEffect(()=>{
  const fetchPrice = async () => {
    try {
      const response = await fetch(`/api/payment/${booking.paymentId}`);
      if (response.ok) {
        const data = await response.json();
        setBookingAmount(data.amount / 100); 
        setDescription(data.description || 'No description available');
      }
    } catch (error) {
      console.error('Error fetching booking price:', error);
    }
  };
  fetchPrice();
}, [booking.id]);



  return (
    <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={movieTitle}
              className="w-24 h-32 object-cover object-top rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{movieTitle}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-calendar-line"></i>
                    </div>
                    <span>{formatDate(booking.showDate)} at {booking.showTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-building-line"></i>
                    </div>
                    <span>{description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-armchair-line"></i>
                    </div>
                    <span>Seats: {booking.seats.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-calendar-check-line"></i>
                    </div>
                    <span>Booked on: {formatDate(booking.bookingDate)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">₹{bookingAmount}</div>
                  <div className="text-sm text-gray-600">Booking ID: {booking.id}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
              >
                {selectedBooking === booking.id ? 'Hide Details' : 'View Details'}
              </button>
              {booking.status === 'confirmed' && (
                <button
                  className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                  onClick={() => handleDownloadTicket(booking)}
                >
                  Download Ticket
                </button>
              )}
              {booking.status === 'pending' && (
                <button className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium">
                  Cancel Booking
                </button>
              )}
            </div>
            {selectedBooking === booking.id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Booking Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Movie:</span> {movieTitle}
                  </div>
                  <div>
                    <span className="font-medium">Theater ID:</span> {booking.theaterId}
                  </div>
                  <div>
                    <span className="font-medium">Date & Time:</span> {formatDate(booking.showDate)} at {booking.showTime}
                  </div>
                  <div>
                    <span className="font-medium">Seats:</span> {booking.seats.join(', ')} ({booking.seats.length} tickets)
                  </div>
                  <div>
                    <span className="font-medium">Total Amount:</span> ₹{bookingAmount}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {booking.status}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;