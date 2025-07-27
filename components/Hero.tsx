
'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative h-96 bg-gradient-to-r from-red-600 to-purple-700 flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.8), rgba(126, 34, 206, 0.8)), url('https://readdy.ai/api/search-image?query=Modern%20cinema%20movie%20theater%20interior%20with%20comfortable%20red%20seats%20rows%2C%20dramatic%20lighting%2C%20large%20silver%20screen%2C%20luxurious%20movie%20hall%20atmosphere%2C%20professional%20cinematography%2C%20warm%20ambient%20lighting%2C%20elegant%20architectural%20design%2C%20premium%20movie%20experience&width=1200&height=400&seq=hero1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Book Your Perfect Movie Experience
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover the latest movies, choose your seats, and enjoy the show
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/movies" 
            className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            Browse Movies
          </Link>
          <Link 
            href="/theaters" 
            className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Find Theaters
          </Link>
        </div>
      </div>
    </section>
  );
}
