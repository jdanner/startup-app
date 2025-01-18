import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-24 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">John Danner</h1>
            <p className="text-2xl text-gray-200">
              Building and investing in education.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Startups Section */}
            <section className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Startups</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Partnering with founders who combine strong metrics with rapid experimentation 
                  to build companies that accelerate progress in learning and work.
                </p>
                
                <Link 
                  to="/companies" 
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Portfolio →</h3>
                  <p className="text-gray-600">View our portfolio companies and job opportunities</p>
                </Link>

                <Link 
                  to="/apply" 
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply for Funding
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* Non-Profits Section */}
            <section className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Non-Profits</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Supporting organizations that create lasting positive impact through 
                  innovative approaches to education.
                </p>
                
                <Link 
                  to="/nonprofit-portfolio" 
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Initiatives →</h3>
                  <p className="text-gray-600">Learn about our education partners</p>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home; 