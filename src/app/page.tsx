import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-[url('/images/AvengersAssembleScene-TheAvengers2012MovieClipHD-ezgif.com-video-to-webp-converter.webp')] bg-cover bg-center w-full h-screen relative overflow-hidden">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Star Wars Logo */}
      
        
        {/* Welcome text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4 tracking-wider">
            WELCOME
          </h1>
          <p className="text-xl md:text-2xl text-white mb-2">
            To a Galaxy Far, Far Away...
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the vast universe of Star Wars. Discover characters, planets, starships, and the epic films that shaped a generation.
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Explore Galaxy Button */}
          <Link href="/characters">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 min-w-[200px]">
              <span className="relative z-10">EXPLORE GALAXY</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          
          {/* Star Wars Documentation Button */}
          <a 
            href="https://starwars.fandom.com/wiki/Main_Page" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="group relative px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-400 font-bold text-lg rounded-lg shadow-lg hover:bg-blue-400 hover:text-black transform hover:scale-105 transition-all duration-300 min-w-[200px]">
              <span className="relative z-10">STAR WARS WIKI</span>
            </button>
          </a>
        </div>
        
        {/* Footer quote */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 italic text-lg">
            "May the Force be with you"
          </p>
        </div>
      </div>
    </div>
  )
}