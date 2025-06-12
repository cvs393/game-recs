import type { TabProps } from '../types'

export function Tabs({ activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex justify-center my-6">
      <nav className="flex space-x-4 bg-primary-100 rounded-pill p-2 shadow-sm" aria-label="Tabs">
        <button
          onClick={() => onTabChange('games')}
          className={`pill transition-colors duration-200 ${
            activeTab === 'games'
              ? 'bg-white text-editorial shadow font-serif' // active
              : 'bg-primary-100 text-editorial hover:bg-primary-200 font-serif'
          }`}
        >
          Game Recommender
        </button>
        <button
          onClick={() => onTabChange('trips')}
          className={`pill transition-colors duration-200 ${
            activeTab === 'trips'
              ? 'bg-white text-editorial shadow font-serif' // active
              : 'bg-primary-100 text-editorial hover:bg-primary-200 font-serif'
          }`}
        >
          Trip Recommender
        </button>
      </nav>
    </div>
  )
} 