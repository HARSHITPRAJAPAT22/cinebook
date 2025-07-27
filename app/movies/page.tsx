'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  original_language: string;
  vote_average: number;
  runtime?: number;
  release_date: string;
  poster_path: string;
  overview: string;
}

const genreMap: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const genreNameToId: { [key: string]: number } = Object.entries(genreMap).reduce((acc, [id, name]) => {
  acc[name] = Number(id);
  return acc;
}, {} as { [key: string]: number });

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [dateFrom, setDateFrom] = useState('2025-06-25');
  const [dateTo, setDateTo] = useState('2025-07-25');
  const [selectedRegion, setSelectedRegion] = useState('IN');

  const genres = ['All', ...Object.values(genreMap)];
  const languages = ['All', 'Hindi', 'English', 'Tamil', 'Telugu'];
  const regions = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'CN', name: 'China' },
    { code: 'RU', name: 'Russia' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
  ];

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [searchTerm, selectedGenre, selectedLanguage, dateFrom, dateTo, selectedRegion]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      let url = `https://api.themoviedb.org/3/discover/movie?api_key=328aa2fcc30517cb12a60920c82d1f97&region=${selectedRegion}`;

      // Language filter
      if (selectedLanguage !== 'All') {
        const langMap: { [key: string]: string } = { Hindi: 'hi', English: 'en', Tamil: 'ta', Telugu: 'te' };
        url += `&with_original_language=${langMap[selectedLanguage] || 'hi'}`;
      }

      // Genre filter
      if (selectedGenre !== 'All' && genreNameToId[selectedGenre]) {
        url += `&with_genres=${genreNameToId[selectedGenre]}`;
      }

      // Date filter
      url += `&primary_release_date.gte=${dateFrom}&primary_release_date.lte=${dateTo}`;

      // Search filter (TMDB doesn't support direct title search in discover, so filter after fetch)
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      let results = data.results || [];

      // Local search filter
      if (searchTerm.trim()) {
        results = results.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setMovies(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => genreMap[id]).filter(Boolean).join(', ') || 'Unknown';
  };

  const getLanguageName = (lang: string) => {
    const langMap: { [key: string]: string } = {
      'hi': 'Hindi',
      'en': 'English',
      'ta': 'Tamil',
      'te': 'Telugu'
    };
    return langMap[lang] || lang.toUpperCase();
  };

  const filteredMovies = movies.filter(movie => {
    const movieGenres = getGenreNames(movie.genre_ids);
    const matchesGenre = selectedGenre === 'All' || movieGenres.includes(selectedGenre);
    const movieLanguage = getLanguageName(movie.original_language);
    const matchesLanguage = selectedLanguage === 'All' || movieLanguage === selectedLanguage;
    return matchesGenre && matchesLanguage;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hindi Movies</h1>
            <p className="text-gray-600">Discover and book tickets for the latest Hindi movies releasing in {new Date().toLocaleDateString()}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200" />
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-gray-200 h-4 w-12 rounded" />
                    <div className="bg-gray-200 h-4 w-16 rounded" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
                  <div className="h-3 bg-gray-200 rounded mb-3 w-1/3" />
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-8 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
              <i className="ri-error-warning-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading movies</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchMovies}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hindi Movies</h1>
          <p className="text-gray-600">
            Discover and book tickets for the latest Hindi movies releasing from {new Date(dateFrom).toLocaleDateString()} to {new Date(dateTo).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Movies</label>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
              >
                {regions.map(region => (
                  <option key={region.code} value={region.code}>{region.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Date From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Date To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://readdy.ai/api/search-image?query=Hindi%20movie%20poster%20Bollywood%20film%20dramatic%20lighting%20professional%20movie%20poster%20design&width=300&height=450&seq=default&orientation=portrait'
                }
                alt={movie.title}
                className="w-full h-64 object-cover object-top"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{movie.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600">{getLanguageName(movie.original_language)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{getGenreNames(movie.genre_ids)}</p>
                <p className="text-xs text-gray-500 mb-3">Release: {new Date(movie.release_date).toLocaleDateString()}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">₹200</span>
                    <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                    onClick={() => {
                      const urlParams = new URLSearchParams(window.location.search);
                      const theaterId = urlParams.get('theaterId');
                      if (theaterId) {
                      window.location.href = `/booking/${movie.id}?theaterId=${theaterId}`;
                      } else {
                      window.location.href = `/movie/${movie.id}`;
                      }
                    }}
                    >
                    Book Now
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredMovies.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <i className="ri-movie-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No movies found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
