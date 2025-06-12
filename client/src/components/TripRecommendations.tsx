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
    <div className="space-y-8">
      {/* Packing List */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Packing List</h3>
        <ul className="grid grid-cols-2 gap-2">
          {recommendation.packingList.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Transportation */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transportation Options</h3>
        <div className="space-y-4">
          {recommendation.transportation.map((transport, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">{transport.type}</h4>
              <p className="text-sm text-gray-600 mt-1">{transport.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tourist Spots */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Tourist Spots</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendation.touristSpots.map((spot, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{spot.name}</h4>
                <span className="text-sm text-yellow-600">★ {spot.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{spot.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Restaurants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendation.restaurants.map((restaurant, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{restaurant.name}</h4>
                  <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-yellow-600">★ {restaurant.rating.toFixed(1)}</span>
                  <p className="text-sm text-gray-500">{restaurant.priceRange}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accommodation Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendation.hotels.map((hotel, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{hotel.name}</h4>
                  <p className="text-sm text-gray-500">{hotel.priceRange}</p>
                </div>
                <span className="text-sm text-yellow-600">★ {hotel.rating.toFixed(1)}</span>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {recommendation.events.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{event.name}</h4>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fun Facts</h3>
        <ul className="space-y-2">
          {recommendation.funFacts.map((fact, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cost Breakdown */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900">Total Estimated Cost</h4>
            <span className="text-lg font-semibold text-gray-900">
              {recommendation.totalCost.currency} {recommendation.totalCost.estimated.toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            {recommendation.totalCost.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.category}</span>
                <span className="text-gray-900">{recommendation.totalCost.currency} {item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 