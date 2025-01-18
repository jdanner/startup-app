import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { companies } from './data/companies';

function JobBoard() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const companyFilter = searchParams.get('company');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // In production, this would call your API
        // For now, simulate job data based on outschool.py structure
        const mockJobs = [
          {
            id: 1,
            company: 'Outschool',
            title: 'Senior Software Engineer',
            location: 'Remote',
            department: 'Engineering',
            url: 'https://boards.greenhouse.io/outschool/jobs/1234',
            first_seen: new Date().toISOString(),
            last_seen: new Date().toISOString()
          },
          // Add more mock jobs...
        ];

        setJobs(companyFilter 
          ? mockJobs.filter(job => job.company === companyFilter)
          : mockJobs
        );
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [companyFilter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:text-blue-700 mb-8 block">← Back to Companies</Link>
      <h1 className="text-3xl font-bold mb-8">Portfolio Job Board</h1>
      
      {/* Filters */}
      <div className="flex gap-6 mb-8">
        <select 
          value={companyFilter}
          onChange={(e) => {
            const newCompany = e.target.value;
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('company', newCompany);
            window.location.href = `${window.location.pathname}?${newSearchParams.toString()}`;
          }}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Companies</option>
          {Object.keys(companies).map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {/* Job List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No open positions found</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <div className="text-gray-600 mb-2">{job.company}</div>
              <div className="text-gray-600 mb-2">{job.location}</div>
              {job.department && (
                <div className="text-gray-600 mb-4">{job.department}</div>
              )}
              <div className="flex gap-4">
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Description
                </a>
                <a 
                  href={`${job.url}#app`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Apply
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobBoard; 