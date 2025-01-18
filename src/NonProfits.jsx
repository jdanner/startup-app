import { Link } from 'react-router-dom';

function NonProfits() {
  const nonprofits = {
    "Rocketship Public Schools": {
      logo: "http://localhost:5173/images/rocketshp.jpeg",
      description: "A national network of public elementary charter schools serving primarily low-income communities with limited access to excellent schools.",
      website: "https://rocketshipschools.org",
      jobsUrl: "https://www.rocketshipschools.org/join-our-team/"
    },
    "Cristo Rey San Jose High School": {
      logo: "http://localhost:5173/images/cristorey.png",
      description: "A Catholic college preparatory high school empowering students from underserved communities through an innovative Corporate Work Study Program and rigorous academics.",
      website: "https://www.cristoreysj.org",
      jobsUrl: "https://www.cristoreysj.org/careers"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:text-blue-700 mb-8 block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Non-Profits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(nonprofits).map(([name, info]) => (
            <div key={name} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="h-16 mb-4 flex items-center">
                <img 
                  src={info.logo} 
                  alt={`${name} logo`}
                  className="max-h-full max-w-[200px] object-contain"
                />
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {info.description}
              </p>
              <div className="flex gap-4">
                <a 
                  href={info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-center font-medium"
                >
                  Website
                </a>
                <a
                  href={info.jobsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center font-medium"
                >
                  View Jobs
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NonProfits; 