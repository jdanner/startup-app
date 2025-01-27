import { useState, useEffect } from 'react';
import { API_URL } from './config';

export default function AdminView() {
  const [applications, setApplications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${API_URL}/api/applications`);
        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to fetch applications');
      }
    };

    fetchApplications();
  }, []);

  const toggleExpand = (timestamp) => {
    setExpandedId(expandedId === timestamp ? null : timestamp);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const deleteApplication = async (timestamp) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    
    try {
      // First do preflight check
      const preflightResponse = await fetch(`${API_URL}/api/applications/${timestamp}`, {
        method: 'OPTIONS'
      });
      
      if (!preflightResponse.ok) throw new Error('Preflight failed');
      
      // Then do DELETE
      const response = await fetch(`${API_URL}/api/applications/${timestamp}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      // Only update UI after successful delete
      setApplications(applications.filter(app => app.timestamp !== timestamp));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete application');
    }
  };

  const renderApplicationDetails = (app) => {
    if (app.type === 'non-profit') {
      return (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Organization Details</h3>
              <p>Website: <a 
                href={app.website.startsWith('http') ? app.website : `https://${app.website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                {app.website}
              </a></p>
              <p>Founder: {app.founder}</p>
              <p>Email: {app.email}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium">Mission</h3>
            <p className="mt-2 whitespace-pre-wrap">{app.mission}</p>
          </div>
        </div>
      );
    }
    
    // For-profit application display (keep existing code)
    return (
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Company Details</h3>
            <p>Website: <a 
              href={app.websiteUrl.startsWith('http') ? app.websiteUrl : `https://${app.websiteUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              {app.websiteUrl}
            </a></p>
            <p>Email: {app.email}</p>
          </div>
          <div>
            <h3 className="font-medium">Documents</h3>
            {app.deckUrl && <p>Deck: <a href={app.deckUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Deck</a></p>}
            {app.videoUrl && <p>Video: <a href={app.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Video</a></p>}
            {app.experimentUrl && <p>Experiments: <a href={app.experimentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Experiments</a></p>}
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium">Metrics</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <p>Need: {app.need}%</p>
            <p>Value Prop: {app.valueProposition}%</p>
            <p>Magic: {app.magic}%</p>
            <p>Activation: {app.activation}%</p>
            <p>Intrigued: {app.intrigued}%</p>
            <p>Habit: {app.habit}%</p>
            <p>Growth Loops: {app.growthLoops}</p>
            <p>Growth: {app.growth}%</p>
            <p>Channel: {app.channel}</p>
            <p>Engagement: {app.engagement}</p>
            <p>Monetization: {app.monetization}%</p>
            <p>Experiments/Week: {app.experimentsPerWeek}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Submitted Applications</h1>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.timestamp} className="bg-white rounded-lg shadow relative">
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(app.timestamp)}
              >
                <span className="font-medium">
                  {app.type === 'non-profit' ? app.organizationName : app.companyName}
                </span>
                <span className="mx-2">|</span>
                <span className="text-gray-600">{app.email}</span>
                <span className="mx-2">|</span>
                <span className="text-gray-600">{formatDate(app.timestamp)}</span>
                <span className="mx-2">|</span>
                <span className={`text-sm ${app.type === 'non-profit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded`}>
                  {app.type === 'non-profit' ? 'Non-Profit' : 'For-Profit'}
                </span>
              </div>

              {expandedId === app.timestamp && (
                <div className="p-4 border-t">
                  {renderApplicationDetails(app)}
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteApplication(app.timestamp);
                }}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Delete application"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 