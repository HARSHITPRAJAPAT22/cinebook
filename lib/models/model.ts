export interface Booking {
  id: string;
  movieId: string;
  theaterId: string;
  showDate: string;
  showTime: string;
  seats: string[];
  bookingDate: string;
  status: string;
  amount?: number;
  image: string;
  paymentId: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
    AuthProvider: string;
    profileImage: string;
    bookings: Booking[];
        
}

export interface Theater {
    id: string;
    name: string;
    location: string;
    showDate:[
        {
            date: string;
            time: string[];
        }
    ]
}

