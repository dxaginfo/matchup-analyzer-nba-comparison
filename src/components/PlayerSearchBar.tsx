import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { searchPlayers } from '../features/playerSearch/playerSearchSlice'
import { addPlayerToComparison } from '../features/comparison/comparisonSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Player } from '../models/Player'

const PlayerSearchBar = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [isResultsVisible, setIsResultsVisible] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  
  const { results, loading, error } = useSelector((state: RootState) => state.playerSearch)
  const { selectedPlayers } = useSelector((state: RootState) => state.comparison)
  
  useEffect(() => {
    if (searchTerm.length >= 2) {
      dispatch(searchPlayers(searchTerm))
      setIsResultsVisible(true)
    } else {
      setIsResultsVisible(false)
    }
  }, [searchTerm, dispatch])
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef])
  
  const handleSelectPlayer = (player: Player) => {
    if (selectedPlayers.length < 4 && !selectedPlayers.some(p => p.id === player.id)) {
      dispatch(addPlayerToComparison(player))
      setSearchTerm('')
      setIsResultsVisible(false)
    }
  }
  
  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="input pr-10 py-3"
          placeholder="Search for a player..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setIsResultsVisible(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          {loading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>
      
      {isResultsVisible && searchTerm.length >= 2 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden max-h-60 overflow-y-auto">
          {loading && results.length === 0 && (
            <div className="flex justify-center items-center p-4 text-gray-500">
              Loading...
            </div>
          )}
          
          {!loading && results.length === 0 && (
            <div className="p-4 text-gray-500 text-center">
              No players found. Try a different search term.
            </div>
          )}
          
          {error && (
            <div className="p-4 text-red-500 text-center">
              Error: {error}
            </div>
          )}
          
          {results.map(player => {
            const isAlreadySelected = selectedPlayers.some(p => p.id === player.id)
            const isDisabled = selectedPlayers.length >= 4 || isAlreadySelected
            
            return (
              <div 
                key={player.id} 
                className={`p-3 border-b last:border-b-0 flex items-center ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
                onClick={() => !isDisabled && handleSelectPlayer(player)}
              >
                <div className="flex-shrink-0 mr-3">
                  {player.imageUrl ? (
                    <img src={player.imageUrl} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      {player.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{player.name}</div>
                  <div className="text-sm text-gray-500">{player.team} · {player.position}</div>
                </div>
                <div className="ml-auto">
                  {isAlreadySelected ? (
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                      Selected
                    </span>
                  ) : selectedPlayers.length >= 4 ? (
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                      Max players
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                      Add to comparison
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PlayerSearchBar
