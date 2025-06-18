const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-display font-bold text-lg">NBA Matchup Analyzer</span>
            <p className="text-gray-600 text-sm mt-1">Compare players and analyze matchups with interactive visualizations</p>
          </div>
          <div className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} NBA Matchup Analyzer • All data for educational purposes
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
