const NoPlayersSelected = () => {
  return (
    <div className="card py-12">
      <div className="text-center">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">No Players Selected</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Use the search bar above to find and select players you want to compare. You can add up to 4 players.  
        </p>
        <div className="max-w-md mx-auto text-left bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-primary-800 mb-2">Quick Tips:</h4>
          <ul className="text-primary-700 space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Search by player name, team, or position
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Compare current players or historical greats
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View visualizations to understand strengths and weaknesses
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NoPlayersSelected
