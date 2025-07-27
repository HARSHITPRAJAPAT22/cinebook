'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const genres = ['All', ...Object.values(genreMap)];
const languages = ['All', 'Hindi', 'English', 'Tamil', 'Telugu'];

const regionIndustryData = [
  {
    name: "North India",
    industries: [
      {
        name: "Bollywood",
        primary_languages: ["Hindi", "Urdu", "Hinglish"],
        genres: [
          { name: "Romance" },
          { name: "Action-Comedy / Masala" },
          { name: "Drama" },
          { name: "Comedy" },
          { name: "Thriller / Crime" },
          { name: "Biopics" },
          { name: "Patriotic" }
        ]
      },
      {
        name: "Punjabi Cinema",
        primary_languages: ["Punjabi"],
        genres: [
          { name: "Comedy" },
          { name: "Romantic Comedy / Drama" },
          { name: "Family Drama" },
          { name: "Action" }
        ]
      }
    ]
  },
  {
    name: "South India",
    industries: [
      {
        name: "Telugu Cinema (Tollywood)",
        primary_languages: ["Telugu"],
        genres: [
          { name: "Mass Action Entertainers" },
          { name: "Family Drama" },
          { name: "Fantasy / Mythological" },
          { name: "Romantic Comedy" },
          { name: "Thriller" }
        ]
      },
      {
        name: "Tamil Cinema (Kollywood)",
        primary_languages: ["Tamil"],
        genres: [
          { name: "Action-Thriller" },
          { name: "Social Drama" },
          { name: "Political Thriller / Drama" },
          { name: "Comedy" }
        ]
      },
      {
        name: "Malayalam Cinema (Mollywood)",
        primary_languages: ["Malayalam"],
        genres: [
          { name: "Realistic Drama" },
          { name: "Thriller / Mystery" },
          { name: "Slice-of-Life / Dark Comedy" },
          { name: "Character-Driven Films" },
          { name: "Experimental" }
        ]
      },
      {
        name: "Kannada Cinema (Sandalwood)",
        primary_languages: ["Kannada"],
        genres: [
          { name: "Action / Mass Entertainers" },
          { name: "Family Drama" },
          { name: "Romantic Comedy" },
          { name: "Social / Period Drama" }
        ]
      }
    ]
  },
  {
    name: "East India",
    industries: [
      {
        name: "Bengali Cinema (Tollywood)",
        primary_languages: ["Bengali"],
        genres: [
          { name: "Art House / Parallel Cinema" },
          { name: "Literary Adaptations" },
          { name: "Drama" },
          { name: "Thriller / Mystery" }
        ]
      },
      {
        name: "Odia Cinema (Ollywood)",
        primary_languages: ["Odia"],
        genres: [
          { name: "Romantic Drama" },
          { name: "Comedy" }
        ]
      },
      {
        name: "Assamese Cinema (Jollywood)",
        primary_languages: ["Assamese"],
        genres: [
          { name: "Social Drama" },
          { name: "Realistic Cinema" }
        ]
      }
    ]
  },
  {
    name: "West India",
    industries: [
      {
        name: "Marathi Cinema",
        primary_languages: ["Marathi"],
        genres: [
          { name: "Comedy" },
          { name: "Social Drama" },
          { name: "Biopics / Historical" },
          { name: "Family Films" }
        ]
      },
      {
        name: "Gujarati Cinema (Dhollywood)",
        primary_languages: ["Gujarati"],
        genres: [
          { name: "Comedy" },
          { name: "Family Drama" },
          { name: "Romantic Comedy" }
        ]
      }
    ]
  }
];

const cityRegionMap: { [key: string]: string } = {
  'Delhi NCR': 'North India',
  'Mumbai': 'West India',
  'Ahmedabad': 'West India',
  'Bengaluru': 'South India',
  'Chennai': 'South India',
  'Hyderabad': 'South India',
  'Kolkata': 'East India',
  'Pune': 'West India',
  'Goa': 'West India',
  'Chandigarh': 'North India'
};

function getGenreNames(genre_ids: number[]): string {
  return genre_ids.map(id => genreMap[id]).filter(Boolean).join(', ');
}

function getLanguageName(lang: string) {
  const langMap: { [key: string]: string } = {
    'hi': 'Hindi',
    'en': 'English',
    'ta': 'Tamil',
    'te': 'Telugu'
  };
  return langMap[lang] || lang.toUpperCase();
}

export default function MovieGrid({ location }: { location: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [bollywoodMovies, setBollywoodMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBollywood, setLoadingBollywood] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const regionName = cityRegionMap[location] || 'North India';
  const todayStr = new Date().toISOString().slice(0, 10);
  const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  useEffect(() => {
    fetchMovies();
    fetchBollywoodMovies();
    // eslint-disable-next-line
  }, [searchTerm, location]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=328aa2fcc30517cb12a60920c82d1f97&region=IN&sort_by=popularity.desc`;
      url += `&primary_release_date.gte=${fifteenDaysAgo}`;
      url += `&primary_release_date.lte=${todayStr}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Bollywood movies API (only Hindi, only today)
  const fetchBollywoodMovies = async () => {
    try {
      const fifteenDaysAgoStr = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      setLoadingBollywood(true);
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=328aa2fcc30517cb12a60920c82d1f97&region=IN&with_original_language=hi&language=en-US&primary_release_date.gte=${fifteenDaysAgoStr}&primary_release_date.lte=${todayStr}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch Bollywood movies');
      const data = await response.json();
      setBollywoodMovies(data.results || []);
    } catch (err) {
      setBollywoodMovies([]);
    } finally {
      setLoadingBollywood(false);
    }
  };

  const filteredMovies = movies.filter(movie => {
    const releaseDate = movie.release_date;
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    return releaseDate === todayStr && matchesSearch;
  });

  // Suggested movies logic (region genres/languages)
  function getSuggestedMovies(movies: Movie[], location: string) {
    const regionObj = regionIndustryData.find(r => r.name === regionName);
    const regionGenres = regionObj
      ? regionObj.industries.flatMap(ind => ind.genres.map(g => g.name))
      : [];
    const regionLanguages = regionObj
      ? regionObj.industries.flatMap(ind => ind.primary_languages)
      : [];
    return movies.filter(movie =>
      movie.genre_ids.some(id => regionGenres.includes(genreMap[id])) ||
      regionLanguages.includes(getLanguageName(movie.original_language))
    );
  }

  const suggestedMovies = getSuggestedMovies(filteredMovies, location);

  if (loading && loadingBollywood) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Now Showing
            </h2>
            <p className="text-xl text-gray-600">
              Discover the latest movies releasing in {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}.
            </p>
          </div>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="ri-loader-4-line text-4xl text-red-600 animate-spin"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading movies...</h3>
            <p className="text-gray-600">Please wait while we fetch the latest movies</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Movies in {location} ({regionName})</h2>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              spellCheck={false}
              autoFocus
            />
            <div className="pointer-events-none absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Suggested Movies Section */}
        {suggestedMovies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Suggested for you</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {suggestedMovies.map(movie => (
                <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : 'https://readdy.ai/api/search-image?query=Hindi%20movie%20poster%20Bollywood%20film%20dramatic%20lighting%20professional%20movie%20poster%20design&width=300&height=450&seq=default&orientation=portrait'
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{getGenreNames(movie.genre_ids)}</span>
                      <span>•</span>
                      <span>{getLanguageName(movie.original_language)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-calendar-line"></i>
                      </div>
                      <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-center block whitespace-nowrap"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bollywood Movies Section */}
        {bollywoodMovies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Bollywood Movies (Hindi, Today)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bollywoodMovies.map(movie => (
                <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : 'https://readdy.ai/api/search-image?query=Hindi%20movie%20poster%20Bollywood%20film%20dramatic%20lighting%20professional%20movie%20poster%20design&width=300&height=450&seq=default&orientation=portrait'
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{getGenreNames(movie.genre_ids)}</span>
                      <span>•</span>
                      <span>{getLanguageName(movie.original_language)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-calendar-line"></i>
                      </div>
                      <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-center block whitespace-nowrap"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Movies Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[2/3] relative">
                <img
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://readdy.ai/api/search-image?query=Hindi%20movie%20poster%20Bollywood%20film%20dramatic%20lighting%20professional%20movie%20poster%20design&width=300&height=450&seq=default&orientation=portrait'
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{movie.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{getGenreNames(movie.genre_ids)}</span>
                  <span>•</span>
                  <span>{getLanguageName(movie.original_language)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-calendar-line"></i>
                  </div>
                  <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/movie/${movie.id}`}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-center block whitespace-nowrap"
                >
                  Book Now
                </Link>
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
    </section>
  );
}
