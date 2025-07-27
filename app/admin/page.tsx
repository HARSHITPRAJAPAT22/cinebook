
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('movies');
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showAddTheater, setShowAddTheater] = useState(false);

  const movies = [
    { id: 1, title: 'Avengers: Endgame', genre: 'Action', rating: 8.4, status: 'Active' },
    { id: 2, title: 'The Dark Knight', genre: 'Action', rating: 9.0, status: 'Active' },
    { id: 3, title: 'Inception', genre: 'Sci-Fi', rating: 8.8, status: 'Active' },
    { id: 4, title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6, status: 'Inactive' },
  ];

  const theaters = [
    { id: 1, name: 'AMC Empire 25', location: 'Times Square', screens: 25, capacity: 4500 },
    { id: 2, name: 'Regal Times Square', location: 'Times Square', screens: 13, capacity: 3200 },
    { id: 3, name: 'Lincoln Square', location: 'Upper West Side', screens: 12, capacity: 2800 },
  ];

  const bookings = [
    { id: 1, movie: 'Avengers: Endgame', theater: 'AMC Empire 25', date: '2024-01-15', time: '6:00 PM', seats: 'A5, A6', amount: '$36', status: 'Confirmed' },
    { id: 2, movie: 'The Dark Knight', theater: 'Regal Times Square', date: '2024-01-16', time: '8:00 PM', seats: 'C8, C9, C10', amount: '$57', status: 'Confirmed' },
    { id: 3, movie: 'Inception', theater: 'Lincoln Square', date: '2024-01-17', time: '3:00 PM', seats: 'B12', amount: '$16', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage movies, theaters, and bookings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('movies')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'movies'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setActiveTab('theaters')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'theaters'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Theaters
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bookings
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'movies' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Movie Management</h2>
                  <button
                    onClick={() => setShowAddMovie(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Add Movie
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {movies.map(movie => (
                        <tr key={movie.id}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{movie.title}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{movie.genre}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{movie.rating}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              movie.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {movie.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'theaters' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Theater Management</h2>
                  <button
                    onClick={() => setShowAddTheater(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Add Theater
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Screens</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {theaters.map(theater => (
                        <tr key={theater.id}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{theater.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{theater.location}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{theater.screens}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{theater.capacity}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Booking Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movie</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Theater</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.map(booking => (
                        <tr key={booking.id}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.movie}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{booking.theater}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{booking.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{booking.time}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{booking.seats}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{booking.amount}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showAddMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Movie</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setShowAddMovie(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">Add Movie</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showAddTheater && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Theater</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Screens</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Capacity</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setShowAddTheater(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">Add Theater</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
