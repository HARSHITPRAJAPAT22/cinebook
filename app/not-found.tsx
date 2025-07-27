'use client';
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dedbdb] to-[#bb2121] flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-white">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full border border-white border-opacity-20">
        {/* Large, striking 404 text */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-[#c23232] drop-shadow-lg mb-4 animate-bounce-slow">
          404
        </h1>

        {/* Main message */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Oops! This page seems to be lost in the celluloid.
        </h2>

        {/* Sub-message / call to action */}
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          The movie you're looking for might not have been generated yet, or it's on a different reel.
        </p>

        {/* Actionable prompt */}
        <p className="text-md sm:text-lg text-blue-300 mb-8">
          Tell me what you were hoping to find, and I'll do my best to bring it to life!
        </p>

        {/* Go Home Button */}
        <a
          href="/" // Link to your home page
          className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Go Back Home
        </a>
      </div>

      {/* Optional: Subtle background animation/element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-40 h-40 bg-[#b65f5f] rounded-full opacity-20 animate-float-1" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-60 h-60 bg-[#ecb1b1] rounded-full opacity-15 animate-float-2" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-32 h-32 bg-[#1e0f0f] rounded-full opacity-25 animate-float-3" style={{ top: '50%', left: '5%' }}></div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }

        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, 10px); }
          50% { transform: translate(0, 20px); }
          75% { transform: translate(20px, 10px); }
          100% { transform: translate(0, 0); }
        }
        .animate-float-1 { animation: float 15s infinite ease-in-out; }
        .animate-float-2 { animation: float 18s infinite ease-in-out reverse; }
        .animate-float-3 { animation: float 12s infinite ease-in-out; }
      `}</style>
    </div>
  );
}
