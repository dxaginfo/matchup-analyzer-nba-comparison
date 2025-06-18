import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPlayerById } from '../api/playersApi'
import { Player } from '../models/Player'

const PlayerProfilePage = () => {
  const { playerId } = useParams<{ playerId: string }>()
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchPlayer = async () => {
      if (!playerId) return
      
      try {
        setLoading(true)
        const playerData = await getPlayerById(playerId)
        setPlayer(playerData)
      } catch (err) {
        setError('Failed to load player data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPlayer()
  }, [playerId])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (error || !player) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">{error || 'Player not found'}</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <section className="card">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              {player.imageUrl ? (
                <img 
                  src={player.imageUrl} 
                  alt={player.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="text-6xl text-gray-400">
                  {player.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{player.name}</h1>
            <div className="text-xl text-gray-600 mb-4">
              #{player.jerseyNumber} | {player.position} | {player.team}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-gray-600 text-sm">Height</div>
                <div className="font-bold">{player.height}</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Weight</div>
                <div className="font-bold">{player.weight} lbs</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Age</div>
                <div className="font-bold">{player.age}</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Experience</div>
                <div className="font-bold">{player.experience} years</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {player.accolades?.map((accolade, index) => (
                <span key={index} className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {accolade}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Season Averages</h3>
          <div className="space-y-4">
            {Object.entries(player.seasonAverages || {}).map(([stat, value]) => (
              <div key={stat} className="flex justify-between items-center">
                <span className="text-gray-600">{formatStatName(stat)}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Career Stats</h3>
          <div className="space-y-4">
            {Object.entries(player.careerStats || {}).map(([stat, value]) => (
              <div key={stat} className="flex justify-between items-center">
                <span className="text-gray-600">{formatStatName(stat)}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Advanced Metrics</h3>
          <div className="space-y-4">
            {Object.entries(player.advancedStats || {}).map(([stat, value]) => (
              <div key={stat} className="flex justify-between items-center">
                <span className="text-gray-600">{formatStatName(stat)}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="card">
        <h3 className="text-xl font-bold mb-6">Player Bio</h3>
        <p className="text-gray-700 leading-relaxed">{player.bio}</p>
      </section>
    </div>
  )
}

const formatStatName = (stat: string): string => {
  const formattedStats: Record<string, string> = {
    ppg: 'Points',
    rpg: 'Rebounds',
    apg: 'Assists',
    spg: 'Steals',
    bpg: 'Blocks',
    fg_pct: 'FG%',
    fg3_pct: '3PT%',
    ft_pct: 'FT%',
    mpg: 'Minutes',
    topg: 'Turnovers',
    per: 'PER',
    ts_pct: 'TS%',
    vorp: 'VORP',
    ws: 'Win Shares',
    bpm: 'Box +/-',
    pir: 'PIR',
  }
  
  return formattedStats[stat] || stat
}

export default PlayerProfilePage
