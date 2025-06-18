import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import PlayerSearchBar from '../components/PlayerSearchBar'
import PlayerComparisonCard from '../components/comparison/PlayerComparisonCard'
import RadarChart from '../components/charts/RadarChart'
import ComparisonStats from '../components/comparison/ComparisonStats'
import NoPlayersSelected from '../components/comparison/NoPlayersSelected'

const ComparisonPage = () => {
  const { selectedPlayers } = useSelector((state: RootState) => state.comparison)
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'charts'>('overview')
  
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-6">Player Comparison</h1>
        <div className="card">
          <h2 className="text-xl mb-4">Select Players to Compare</h2>
          <p className="text-gray-600 mb-4">Search for players by name, team, position, or era</p>
          <PlayerSearchBar />
          <div className="mt-4 text-sm text-gray-500">
            {selectedPlayers.length === 0 ? (
              <span>No players selected. Add up to 4 players to compare.</span>
            ) : (
              <span>Selected {selectedPlayers.length} player(s). You can add up to {4 - selectedPlayers.length} more.</span>
            )}
          </div>
        </div>
      </section>
      
      {selectedPlayers.length > 0 ? (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedPlayers.map(player => (
              <PlayerComparisonCard key={player.id} player={player} />
            ))}
          </section>
          
          <section className="card">
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'stats' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Detailed Stats
                </button>
                <button
                  onClick={() => setActiveTab('charts')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'charts' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Visualizations
                </button>
              </nav>
            </div>
            
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Player Comparison</h3>
                  <div className="h-80">
                    <RadarChart players={selectedPlayers} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Key Metrics</h3>
                  <ComparisonStats players={selectedPlayers} />
                </div>
              </div>
            )}
            
            {activeTab === 'stats' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Detailed Statistics</h3>
                {/* This would be implemented with a detailed stats table component */}
                <p className="text-gray-600">Detailed stats table would be implemented here, showing season averages, career highs, etc.</p>
              </div>
            )}
            
            {activeTab === 'charts' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Statistical Visualizations</h3>
                {/* This would be implemented with various chart components */}
                <p className="text-gray-600">Additional chart visualizations would be implemented here, such as shot charts, performance trends, etc.</p>
              </div>
            )}
          </section>
        </>
      ) : (
        <NoPlayersSelected />
      )}
    </div>
  )
}

export default ComparisonPage
