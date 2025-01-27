import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [showTypeSelect, setShowTypeSelect] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">John Danner</h1>
        <p className="text-xl mb-12">Building and investing in education.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Startups Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Startups</h2>
            <p className="text-gray-600 mb-8">
              Partnering with founders who combine strong metrics with rapid experimentation to build companies that accelerate progress in learning and work.
            </p>
            <div className="space-y-4">
              <Link to="/portfolio" className="block text-blue-600 hover:text-blue-700">
                Portfolio →
                <div className="text-sm text-gray-600">View our portfolio companies and job opportunities</div>
              </Link>
            </div>
          </div>

          {/* Non-Profits Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Non-Profits</h2>
            <p className="text-gray-600 mb-8">
              Supporting organizations that create lasting positive impact through innovative approaches to education.
            </p>
            <div className="space-y-4">
              <Link to="/initiatives" className="block text-blue-600 hover:text-blue-700">
                Initiatives →
                <div className="text-sm text-gray-600">Learn about our education partners</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Apply Button and Type Select below both cards */}
        <div className="mt-12 flex flex-col items-center">
          {!showTypeSelect ? (
            <button 
              onClick={() => setShowTypeSelect(true)}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Apply for Funding →
            </button>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Organization Type:</h3>
              <div className="flex gap-4">
                <Link 
                  to="/apply/for-profit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  For-Profit
                </Link>
                <Link 
                  to="/apply/non-profit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Non-Profit
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home; 