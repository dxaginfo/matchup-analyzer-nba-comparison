import { Player } from '../../models/Player'

type ComparisonStatsProps = {
  players: Player[]
}

const ComparisonStats = ({ players }: ComparisonStatsProps) => {
  // These are the key stats we want to compare
  const keyStats = [
    { key: 'ppg', label: 'Points Per Game' },
    { key: 'rpg', label: 'Rebounds Per Game' },
    { key: 'apg', label: 'Assists Per Game' },
    { key: 'spg', label: 'Steals Per Game' },
    { key: 'bpg', label: 'Blocks Per Game' },
    { key: 'fg_pct', label: 'Field Goal %' },
    { key: 'fg3_pct', label: '3PT %' },
    { key: 'ft_pct', label: 'Free Throw %' },
    { key: 'mpg', label: 'Minutes Per Game' },
  ]
  
  // A function to determine the best value for a stat
  const getBestValue = (stat: string) => {
    const values = players.map(p => p.seasonAverages?.[stat] || 0)
    return Math.max(...values)
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-gray-500 text-sm font-medium pb-2">Stat</th>
            {players.map(player => (
              <th key={player.id} className="text-left text-gray-500 text-sm font-medium pb-2">
                {player.name.split(' ')[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keyStats.map(stat => {
            const bestValue = getBestValue(stat.key)
            
            return (
              <tr key={stat.key} className="border-t border-gray-100">
                <td className="py-3 text-gray-600">{stat.label}</td>
                {players.map(player => {
                  const value = player.seasonAverages?.[stat.key] || 0
                  const isBest = value === bestValue && bestValue !== 0
                  
                  return (
                    <td 
                      key={player.id} 
                      className={`py-3 ${isBest ? 'font-bold text-primary-700' : ''}`}
                    >
                      {value || '-'}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonStats
