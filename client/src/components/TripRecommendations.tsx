import type { TripRecommendation } from '../types'

interface Props {
  recommendation: TripRecommendation | null;
  loading: boolean;
}

export function TripRecommendations({ recommendation, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>Fill out the form to get trip recommendations</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Packing List */}
      <section className="bg-accent-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Packing List</h3>
        <ul className="grid grid-cols-2 gap-4">
          {recommendation.packingList.map((item, index) => (
            <li key={index} className="flex items-center space-x-3 text-lg text-editorial">
              <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Transportation */}
      <section className="bg-primary-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Transportation Options</h3>
        <div className="space-y-6">
          {recommendation.transportation.map((transport, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow border border-primary-100">
              <h4 className="font-serif font-bold text-xl text-editorial">{transport.type}</h4>
              <p className="text-lg text-primary-700 mt-2">{transport.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tourist Spots */}
      <section className="bg-accent-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Top Tourist Spots</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendation.touristSpots.map((spot, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow border border-primary-100">
              <div className="flex justify-between items-start">
                <h4 className="font-serif font-bold text-xl text-editorial">{spot.name}</h4>
                <span className="text-lg text-yellow-600 font-bold">★ {spot.rating.toFixed(1)}</span>
              </div>
              <p className="text-lg text-primary-700 mt-2">{spot.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section className="bg-primary-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Recommended Restaurants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendation.restaurants.map((restaurant, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow border border-primary-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif font-bold text-xl text-editorial">{restaurant.name}</h4>
                  <p className="text-lg text-primary-700">{restaurant.cuisine}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg text-yellow-600 font-bold">★ {restaurant.rating.toFixed(1)}</span>
                  <p className="text-lg text-primary-700">{restaurant.priceRange}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section className="bg-accent-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Accommodation Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendation.hotels.map((hotel, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow border border-primary-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif font-bold text-xl text-editorial">{hotel.name}</h4>
                  <p className="text-lg text-primary-700">{hotel.priceRange}</p>
                </div>
                <span className="text-lg text-yellow-600 font-bold">★ {hotel.rating.toFixed(1)}</span>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-pill text-sm font-semibold bg-primary-100 text-editorial">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="bg-primary-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Upcoming Events</h3>
        <div className="space-y-6">
          {recommendation.events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow border border-primary-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif font-bold text-xl text-editorial">{event.name}</h4>
                  <p className="text-lg text-primary-700">{event.date}</p>
                </div>
              </div>
              <p className="text-lg text-primary-700 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section className="bg-accent-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Fun Facts</h3>
        <ul className="space-y-4">
          {recommendation.funFacts.map((fact, index) => (
            <li key={index} className="flex items-start space-x-3 text-lg text-editorial">
              <svg className="h-6 w-6 text-primary-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cost Breakdown */}
      <section className="bg-primary-50 rounded-[2rem] shadow-lg p-8 fade-in slide-up">
        <h3 className="text-3xl font-serif font-bold text-editorial mb-6">Cost Breakdown</h3>
        <div className="bg-white p-6 rounded-2xl shadow border border-primary-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-serif font-bold text-xl text-editorial">Total Estimated Cost</h4>
            <span className="text-2xl font-bold text-editorial">
              {recommendation.totalCost.currency} {recommendation.totalCost.estimated.toLocaleString()}
            </span>
          </div>
          <div className="space-y-3">
            {recommendation.totalCost.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-lg">
                <span className="text-primary-700">{item.category}</span>
                <span className="text-editorial">{recommendation.totalCost.currency} {item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 