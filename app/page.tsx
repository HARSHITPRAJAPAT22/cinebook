'use client';

import { useState, useEffect } from 'react';
// import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';
import { LocateFixed, Building2 } from "lucide-react";
import { ToastContainer } from 'react-toastify';

const popularCities = [
  'Ahmedabad', 'Bengaluru', 'Chandigarh', 'Chennai', 'Delhi NCR', 'Goa',
  'Hyderabad', 'Kolkata', 'Mumbai', 'Pune'
];

const allCities = [
  'Abohar', 'Abu Road', 'Achampet', 'Acharapakkam'
  // ...add more cities as needed
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Ensure modal opens if no location is selected
  useEffect(() => {
    const savedLocation = typeof window !== 'undefined' ? window.localStorage.getItem('cinebook_location') : '';
    if (savedLocation) setLocation(savedLocation);
    if (!savedLocation) setShowLocationModal(true);
  }, []);

  const handleLocationSelect = (city: string) => {
    setLocation(city);
    window.localStorage.setItem('cinebook_location', city);
    setShowLocationModal(false);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown';
      setLocation(city);
      window.localStorage.setItem('cinebook_location', city);
      setShowLocationModal(false);
    });
  };

  // Prevent closing modal if no location is selected
  const handleCloseModal = () => {
    if (!location) return;
    setShowLocationModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
      {/* <Header /> */}
      <Hero />
      <div className="max-w-2xl mx-auto mt-8">
      <button
        className="bg-gradient-to-r from-red-100 to-purple-100 px-4 py-2 rounded-lg mb-4 w-full text-left shadow"
        onClick={() => setShowLocationModal(true)}
      >
        {location ? `Location: ${location}` : 'Select Location'}
      </button>
      </div>
      {showLocationModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl border border-red-100">
        <h2 className="text-2xl font-extrabold mb-4 text-red-600">Select Location</h2>
        <input
          type="text"
          placeholder="Search city, area or locality"
          className="w-full px-4 py-2 border border-purple-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={e => setLocation(e.target.value)}
          value={location}
        />
        <button
          className="flex items-center gap-2 text-purple-600 mb-4 font-semibold hover:text-red-600 transition"
          onClick={handleCurrentLocation}
        >
          <LocateFixed className="w-5 h-5" />
          Use Current Location
        </button>
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-purple-700">Popular Cities</h3>
          <div className="grid grid-cols-5 gap-4">
          {popularCities.map(city => (
            <button
            key={city}
            className="bg-gradient-to-br from-red-50 to-purple-50 rounded-lg p-3 flex flex-col items-center hover:bg-red-100 transition shadow"
            onClick={() => handleLocationSelect(city)}
            >
            <Building2 className="text-purple-400 w-7 h-7" />
            <span className="mt-2 text-sm font-medium text-gray-700">{city}</span>
            </button>
          ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-purple-700">All Cities</h3>
          <div className="flex gap-2 mb-2 text-xs font-bold text-gray-400">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
            <span key={letter}>{letter}</span>
          ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
          {allCities.map(city => (
            <button
            key={city}
            className="text-gray-700 hover:text-red-600 transition"
            onClick={() => handleLocationSelect(city)}
            >
            {city}
            </button>
          ))}
          </div>
        </div>
        <button
          className={`mt-6 w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-2 rounded-lg font-bold transition ${!location ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-700 hover:to-purple-700'}`}
          onClick={handleCloseModal}
          disabled={!location}
        >
          {location ? 'Continue' : 'Select a city to continue'}
        </button>
        </div>
      </div>
      )}
      {/* Only show MovieGrid if location is selected */}
      {location && <MovieGrid location={location} />}
      <Footer />
      <ToastContainer
      theme="colored"
      toastClassName="bg-gradient-to-r from-red-100 to-purple-100 text-purple-700 font-semibold rounded-lg shadow"
      progressClassName="bg-purple-600"
      />
    </div>
  );
}
