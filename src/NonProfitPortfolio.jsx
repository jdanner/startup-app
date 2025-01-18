import { Link } from 'react-router-dom';

function NonProfitPortfolio() {
  const organizations = [
    {
      name: "Rocketship Public Schools",
      description: "Network of public elementary charter schools serving low-income communities",
      url: "https://rocketshipschools.org",
      impact: "Serving over 10,000 students across multiple states"
    },
    {
      name: "Cristo Rey",
      description: "Network of college preparatory high schools for students of limited economic means",
      url: "https://cristoreynetwork.org",
      impact: "37 schools nationwide with innovative work-study program"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold mb-12">Education Initiatives</h1>
        <div className="space-y-8">
          {organizations.map(org => (
            <div key={org.name} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">{org.name}</h2>
              <p className="text-gray-600 mb-4">{org.description}</p>
              <p className="text-gray-500 mb-4">{org.impact}</p>
              <a href={org.url} className="text-blue-600 hover:text-blue-700">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NonProfitPortfolio; 