'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

export type Theater = {
  id: string;
  name: string;
  location: string;
  city: string;
  district?: string;
  state?: string;
  pincode: string;
  address: string;
  screens: number;
  capacity: number;
  amenities: string[];
  phone: string;
  image: string;
  brand?: string;
  air_conditioning?: boolean;
  payment?: {
    cards?: boolean;
    cash?: boolean;
    online?: boolean;
  };
};

export default function TheatersPage() {
  const [locationQuery, setLocationQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [foundTheaters, setFoundTheaters] = useState<Theater[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch theaters for default location from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocation = window.localStorage.getItem('cinebook_location');
      if (savedLocation) {
        setLocationQuery(savedLocation);
        fetchTheaters(savedLocation);
      }
    }
  }, []);

  // Function to fetch theaters for a given location
  const fetchTheaters = async (location: string) => {
    if (!location.trim()) {
      setSearchStatus('Please enter a location.');
      return;
    }
    setIsSearching(true);
    setSearchStatus('Step 1/2: Finding location...');
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&countrycodes=in`;
    const locationRes = await fetch(nominatimUrl);
    const locationData = await locationRes.json();
    if (!locationData.length) {
      setSearchStatus(`No location found for "${location}".`);
      setIsSearching(false);
      return;
    }
    const { lat, lon } = locationData[0];
    setSearchStatus('Step 2/2: Searching for theaters nearby...');
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="cinema"](around:15000,${lat},${lon});
        way["amenity"="cinema"](around:15000,${lat},${lon});
      );
      out center;
    `;
    const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery,
      headers: { 'Content-Type': 'text/plain' }
    });
    const overpassData = await overpassRes.json();
    const theaters = (overpassData.elements || []).map((el: any) => {
      const tags = el.tags || {};
      const addressParts = [
        tags['addr:housenumber'],
        tags['addr:street'],
        tags['addr:city'],
        tags['addr:district'],
        tags['addr:state'],
        tags['addr:postcode']
      ].filter(Boolean);
      const address = addressParts.length ? addressParts.join(', ') : 'Address not available';
      const imageUrl =
        tags.image ||
        'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

      return {
        id: el.id,
        name: tags.name || 'Unknown Cinema',
        brand: tags.brand || '',
        location: tags['addr:city'] || tags.city || 'not available',
        city: tags['addr:city'] || tags.city || 'not available',
        district: tags['addr:district'] || '',
        state: tags['addr:state'] || '',
        pincode: tags['addr:postcode'] || tags['addr_postcode'] || '',
        address,
        screens: tags.screen ? Number(tags.screen) : 1,
        capacity: tags.capacity ? Number(tags.capacity) : 100,
        amenities: tags.amenity ? [tags.amenity] : [],
        phone: tags.phone || 'not available',
        image: imageUrl,
        air_conditioning: tags['air_conditioning'] === 'yes',
        payment: {
          cards: tags['payment:cards'] === 'yes',
          cash: tags['payment:cash'] === 'yes',
          online: tags['payment:online_booking'] === 'yes'
        }
      };
    });

    setFoundTheaters(theaters);
    setIsSearching(false);

    if (theaters.length === 0) {
      setSearchStatus(`No theaters found near "${location}".`);
    } else {
      setSearchStatus(`${theaters.length} theaters found near ${location}`);
    }
  };

  // Search handler for user input
  const handleLocationSearch = async () => {
    fetchTheaters(locationQuery);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Movie Theaters</h1>
          <p className="text-gray-600">Find theaters in your city</p>
        </div>
        {/* Theaters Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Theaters Near You</h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={locationQuery}
              onChange={e => setLocationQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your location (city, area, etc.)"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleLocationSearch}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              disabled={isSearching}
            >
              {isSearching ? (
                <span>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>Searching...
                </span>
              ) : (
                'Find Nearby Theaters'
              )}
            </button>
          </div>
          {/* <div className="mb-4 text-gray-600 text-center">{searchStatus}</div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundTheaters.map(theater => (
              <div
                key={theater.id}
                className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={theater.image}
                    alt={theater.name}
                    className="w-full h-40 object-cover object-center"
                  />
                  {theater.brand && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold shadow">
                      {theater.brand}
                    </span>
                  )}
                  {theater.air_conditioning && (
                    <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold shadow flex items-center gap-1">
                      <i className="ri-snowflake-line"></i> AC
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">{theater.name}</h4>
                    <p className="text-gray-700 mb-1 truncate">{theater.address}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      {theater.city && <span>City: {theater.city}</span>}
                      {theater.district && <span>District: {theater.district}</span>}
                      {theater.state && <span>State: {theater.state}</span>}
                      {theater.pincode && <span>Pincode: {theater.pincode}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      <span>Screens: <span className="font-semibold">{theater.screens}</span></span>
                      <span>Capacity: <span className="font-semibold">{theater.capacity}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      <span>Amenities: {theater.amenities.length ? theater.amenities.join(', ') : 'N/A'}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      <span>Payment: {theater.payment?.cards && <span>Cards </span>}{theater.payment?.cash && <span>Cash </span>}{theater.payment?.online && <span>Online Booking</span>}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      <span>Phone: {theater.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => window.location.href = `/movies?theaterId=${theater.id}`}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      View Movies
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {foundTheaters.length === 0 && searchStatus && (
              <div className="col-span-full text-gray-500 text-center py-8">{searchStatus}</div>
            )}
          </div>
        </div>
        {foundTheaters.length === 0 && !isSearching && !searchStatus && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <i className="ri-search-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Search for Theaters</h3>
            <p className="text-gray-600">Enter your city name or pincode to find nearby theaters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
