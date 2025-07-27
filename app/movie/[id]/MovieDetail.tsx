'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  original_language: string;
}

interface MovieDetailProps {
  movieId: string;
}

// Helper to format Overpass API data with more details
function formatTheaters(overpassData: any): any[] {
  return (overpassData.elements || []).map((el: any) => {
    // Prefer tags from node/way, fallback to 'Unknown'
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

    // Use image from OSM if available, else fallback
    const imageUrl =
      tags.image ||
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    return {
      id: el.id,
      name: tags.name || 'Unknown Cinema',
      brand: tags.brand || '',
      short_name: tags.short_name || '',
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
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,
      payment: {
        cards: tags['payment:cards'] === 'yes',
        cash: tags['payment:cash'] === 'yes',
        online: tags['payment:online_booking'] === 'yes'
      },
      air_conditioning: tags['air_conditioning'] === 'yes'
    };
  });
}

export default function MovieDetail({ movieId }: MovieDetailProps) {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [selectedShowTime, setSelectedShowTime] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [foundTheaters, setFoundTheaters] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=328aa2fcc30517cb12a60920c82d1f97&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const savedLocation = typeof window !== 'undefined' ? window.localStorage.getItem('cinebook_location') : '';
    if (savedLocation) setLocationQuery(savedLocation);
  }, []);

  const handleLocationSearch = async () => {
    if (!locationQuery.trim()) {
      setSearchStatus('Please enter a location.');
      return;
    }
    setIsSearching(true);
    setSearchStatus('Step 1/2: Finding location...');
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&countrycodes=in`;
    const locationRes = await fetch(nominatimUrl);
    const locationData = await locationRes.json();
    if (!locationData.length) {
      setSearchStatus(`No location found for "${locationQuery}".`);
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
    const theaters = formatTheaters(overpassData);
    setFoundTheaters(theaters);
    setIsSearching(false);
    if (theaters.length === 0) {
      setSearchStatus(`No theaters found near "${locationQuery}".`);
    } else {
      setSearchStatus(`${theaters.length} theaters found near ${locationQuery}`);
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
              <p className="text-gray-600">Loading movie details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Movie Not Found</h1>
            <p className="text-gray-600 mb-6">The movie you're looking for doesn't exist or couldn't be loaded.</p>
            <Link
              href="/movies"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Browse Movies
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const dates = Array.from({ length: 5 }, (_, i) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + i);
    const dateStr = dateObj.toISOString().slice(0, 10);
    let dayLabel;
    if (i === 0) dayLabel = 'Today';
    else if (i === 1) dayLabel = 'Tomorrow';
    else dayLabel = dateObj.toLocaleDateString(undefined, { weekday: 'short' });
    return { date: dateStr, day: dayLabel };
  });

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://readdy.ai/api/search-image?query=Movie%20poster%20placeholder%20cinema%20film%20poster%20design%2C%20elegant%20movie%20poster%20template%2C%20professional%20cinema%20poster%20style&width=400&height=600&seq=placeholder&orientation=portrait';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg object-cover object-top"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{movie.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-yellow-400 text-black px-2 py-1 rounded font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
                {movie.runtime && <span>{movie.runtime} min</span>}
                <span>{movie.genres.map(g => g.name).join(', ')}</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Release Date</h4>
                  <p className="text-gray-700">{new Date(movie.release_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Language</h4>
                  <p className="text-gray-700">{movie.original_language === 'hi' ? 'Hindi' : movie.original_language.toUpperCase()}</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-1">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span key={genre.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Tickets</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Date</h3>
            <div className="flex gap-2 overflow-x-auto">
              {dates.map(dateObj => (
                <button
                  key={dateObj.date}
                  onClick={() => setSelectedDate(dateObj.date)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedDate === dateObj.date
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dateObj.day}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Show Time</h3>
            <div className="space-y-4">
              {/* Show time selection UI goes here */}
                <div className="flex gap-2">
                  {['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedShowTime(time)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedShowTime === time
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                  ))}
                </div>
            </div>
          </div>
        </div>
        {/* Theaters Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Theaters Near You</h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={locationQuery}
              onChange={e => setLocationQuery(e.target.value)}
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
          <div className="mb-4 text-gray-600 text-center">{searchStatus}</div>
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
                      <span>Payment: {theater.payment.cards && <span>Cards </span>}{theater.payment.cash && <span>Cash </span>}{theater.payment.online && <span>Online Booking</span>}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                      <span>Phone: {theater.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        if (selectedDate && selectedShowTime) {
                          window.location.href = `/booking/${movie.id}?theaterId=${theater.id}&date=${selectedDate}&time=${encodeURIComponent(selectedShowTime)}`;
                        } else {
                          window.location.href = `/movie/${movie.id}?theaterId=${theater.id}`;
                        }
                      }}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      Book Here
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
      </div>
      <Footer />
    </div>
  );
}
