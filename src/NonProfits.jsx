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
            <div key={name} className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
              <div className="flex-grow">
                <img 
                  src={info.logo} 
                  alt={`${name} logo`}
                  className="h-12 mb-4"
                />
                <p className="text-gray-700 mb-4">
                  {info.description}
                </p>
              </div>
              <div className="flex gap-4 mt-auto">
                <a 
                  href={info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Website
                </a>
                <a
                  href={info.jobsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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