import { Link } from 'react-router-dom'
import PlayerSearchBar from '../components/PlayerSearchBar'

const HomePage = () => {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nba-blue to-nba-red">NBA Matchup Analyzer</h1>
          <p className="text-xl text-gray-600">
            Compare players, analyze matchups, and gain insights with interactive visualizations
          </p>
          <div className="pt-4">
            <PlayerSearchBar />
          </div>
          <div className="pt-2">
            <span className="text-sm text-gray-500">Or</span>
            <Link to="/comparison" className="block mt-3">
              <button className="btn btn-primary px-6 py-3 text-lg">
                Start Player Comparison
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <FeatureCard 
          title="Player Comparison" 
          description="Compare up to 4 players side by side with detailed stats and visualizations"
          icon={(
            <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        />
        <FeatureCard 
          title="Matchup Analysis" 
          description="Get insights into how players perform against each other with historical data"
          icon={(
            <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          )}
        />
        <FeatureCard 
          title="AI-Powered Insights" 
          description="Discover player compatibility, strengths, and weaknesses with machine learning analysis"
          icon={(
            <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          )}
        />
      </section>
    </div>
  )
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="card flex flex-col items-center text-center p-6">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default HomePage
