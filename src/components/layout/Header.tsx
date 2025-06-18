import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="bg-nba-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" />
              <path d="M50 5A45 45 0 1 0 95 50 45.05 45.05 0 0 0 50 5zm0 5a39.84 39.84 0 0 1 24.51 8.4l-1.55 1.55a2.5 2.5 0 0 0-.73 1.77v8.53a2.5 2.5 0 0 1-.73 1.77l-5.12 5.12a2.5 2.5 0 0 1-1.77.73h-8.53a2.5 2.5 0 0 0-1.77.73l-5.12 5.12a2.5 2.5 0 0 0-.73 1.77v4.82a2.5 2.5 0 0 1-.73 1.77l-8.94 8.94a2.5 2.5 0 0 0-.73 1.77v8.53a2.5 2.5 0 0 0 .73 1.77l5.12 5.12a2.5 2.5 0 0 0 1.77.73H50a39.9 39.9 0 0 1-32.95-17.38l3.07-3.07a2.5 2.5 0 0 0 .73-1.77v-8.53a2.5 2.5 0 0 1 .73-1.77l5.12-5.12a2.5 2.5 0 0 1 1.77-.73h8.53a2.5 2.5 0 0 0 1.77-.73l5.12-5.12a2.5 2.5 0 0 0 .73-1.77V25a2.5 2.5 0 0 1 .73-1.77l4.24-4.24A2.5 2.5 0 0 0 50 17.18v-5.01A40.11 40.11 0 0 1 50 10z" fill="#fff" fillOpacity="0.2"/>
            </svg>
            <div>
              <span className="font-display text-lg md:text-xl font-bold">Matchup Analyzer</span>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({isActive}) => isActive ? 'font-bold' : 'hover:text-gray-200'} end>
              Home
            </NavLink>
            <NavLink to="/comparison" className={({isActive}) => isActive ? 'font-bold' : 'hover:text-gray-200'}>
              Player Comparison
            </NavLink>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-3 pb-3">
            <NavLink 
              to="/" 
              className={({isActive}) => isActive ? 'font-bold' : 'hover:text-gray-200'} 
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/comparison" 
              className={({isActive}) => isActive ? 'font-bold' : 'hover:text-gray-200'}
              onClick={() => setIsMenuOpen(false)}
            >
              Player Comparison
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
