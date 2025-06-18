import { useDispatch } from 'react-redux'
import { removePlayerFromComparison } from '../../features/comparison/comparisonSlice'
import { Player } from '../../models/Player'

type PlayerComparisonCardProps = {
  player: Player
}

const PlayerComparisonCard = ({ player }: PlayerComparisonCardProps) => {
  const dispatch = useDispatch()
  
  const handleRemove = () => {
    dispatch(removePlayerFromComparison(player.id))
  }
  
  return (
    <div className="card relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      <button 
        onClick={handleRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
        aria-label="Remove player"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {player.imageUrl ? (
            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl text-gray-400 font-semibold">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-1">{player.name}</h3>
        <div className="text-gray-500 mb-4">{player.team} · {player.position}</div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
          <div className="text-center">
            <div className="text-gray-500 text-xs">PPG</div>
            <div className="font-bold">{player.seasonAverages?.ppg || '-'}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 text-xs">RPG</div>
            <div className="font-bold">{player.seasonAverages?.rpg || '-'}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 text-xs">APG</div>
            <div className="font-bold">{player.seasonAverages?.apg || '-'}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 text-xs">FG%</div>
            <div className="font-bold">{player.seasonAverages?.fg_pct || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerComparisonCard
