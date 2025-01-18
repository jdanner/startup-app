import { Link } from 'react-router-dom';

function StartupPortfolio() {
  const companies = [
    {
      name: "Outschool",
      description: "Live online classes for K-12 learners. Outschool connects motivated learners, parents, and teachers to create great learning experiences.",
      url: "https://outschool.com",
      jobs: "https://outschool.com/careers",
      status: "Hiring"
    },
    {
      name: "Maven",
      description: "Maven is a cohort-based learning platform that enables experts to create, market, and deliver live online courses. They're revolutionizing professional education by combining community, accountability, and hands-on learning.",
      url: "https://maven.com",
      jobs: "https://maven.com/careers",
      status: "Hiring"
    },
    {
      name: "Abwaab",
      description: "Abwaab is transforming education in the Middle East through their online learning platform. They provide high-quality, localized educational content and interactive features to make learning more accessible and engaging for students.",
      url: "https://abwaab.com",
      jobs: "https://abwaab.com/careers",
      status: "Hiring"
    },
    {
      name: "Swing",
      description: "Swing Education helps schools connect with qualified substitute teachers, addressing staffing challenges while providing flexible opportunities for educators.",
      url: "https://swingeducation.com",
      jobs: "https://swingeducation.com/careers",
      status: "Hiring"
    },
    {
      name: "Primer",
      description: "Primer is a growing network of K-8 Microschools reimagining education in Florida, Arizona, and Alabama.",
      url: "https://primer.com",
      jobs: "https://primer.com/careers",
      status: "Hiring"
    },
    {
      name: "Contra",
      description: "Contra is building the future of independent work, connecting professionals with opportunities while providing tools for career growth.",
      url: "https://contra.com",
      jobs: "https://contra.com/careers",
      status: "Hiring"
    },
    {
      name: "Reforge",
      description: "Reforge offers advanced career programs for professionals in tech, product, marketing, and growth, taught by industry leaders.",
      url: "https://www.reforge.com",
      jobs: "https://www.reforge.com/careers",
      status: "Hiring"
    },
    {
      name: "Synthesis",
      description: "The world's first superhuman math tutor.",
      url: "https://www.synthesis.com",
      jobs: "https://www.synthesis.com/careers",
      status: "Hiring"
    },
    {
      name: "Omella",
      description: "K-12 School Payments - From Prom Tickets to Sports Fundraisers and Concessions - Simplify school payments and eliminate crazy fees!",
      url: "https://omella.com",
      jobs: "https://omella.com/careers",
      status: "Hiring"
    },
    {
      name: "Stepful",
      description: "Stepful provides career training and job placement services, focusing on healthcare and technical professions.",
      url: "https://www.stepful.com",
      jobs: "https://www.stepful.com/careers",
      status: "Hiring"
    },
    {
      name: "SchoolAI",
      description: "SchoolAI is leveraging artificial intelligence to enhance education and streamline administrative tasks in schools.",
      url: "https://schoolai.com",
      jobs: "https://schoolai.com/careers",
      status: "Hiring"
    },
    {
      name: "Cohart",
      description: "Cohart builds community-driven learning experiences for creative professionals and digital creators.",
      url: "https://www.cohart.com",
      jobs: "https://www.cohart.com/careers",
      status: "Hiring"
    },
    {
      name: "Odyssey",
      description: "Odyssey is establishing choice in K-12 education by accelerating use of Education Savings Accounts (ESAs).",
      url: "https://withodyssey.com",
      jobs: "https://withodyssey.com/careers",
      status: "Hiring"
    },
    {
      name: "Brightbee",
      description: "BrightBee is an online platform that connects workers with opportunities at K-12 schools in their community.",
      url: "https://brightbee.org",
      jobs: "https://brightbee.org/careers",
      status: "Hiring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold mb-12">Portfolio Companies</h1>
        <div className="space-y-8">
          {companies.map(company => (
            <div key={company.name} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">{company.name}</h2>
                {company.status && (
                  <span className={`text-sm font-medium px-2.5 py-0.5 rounded ${
                    company.status === 'Hiring' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {company.status}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="space-x-4">
                <a href={company.url} className="text-blue-600 hover:text-blue-700">
                  {company.name === 'My Portfolio' ? 'GitHub' : 'Website'} →
                </a>
                {company.jobs && (
                  <a href={company.jobs} className="text-blue-600 hover:text-blue-700">Jobs →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StartupPortfolio; 