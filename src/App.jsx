import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminView from './AdminView';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const uploadFile = async (file) => {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) throw new Error('File upload failed');
  const data = await response.json();
  // Encode the URL to handle spaces and special characters
  return encodeURI(data.url);
};

const uploadFiles = async (data) => {
  try {
    const [deckFile, videoFile, experimentFile, analyticsFile] = await Promise.all([
      data.deckFile?.[0] ? uploadFile(data.deckFile[0]) : null,
      data.videoFile?.[0] ? uploadFile(data.videoFile[0]) : null,
      data.experimentFile?.[0] ? uploadFile(data.experimentFile[0]) : null,
      data.analyticsFile?.[0] ? uploadFile(data.analyticsFile[0]) : null
    ]);

    return {
      deckUrl: deckFile || data.deckUrl || '',
      videoUrl: videoFile || data.videoUrl || '',
      experimentUrl: experimentFile || data.experimentUrl || '',
      analyticsUrl: analyticsFile || data.analyticsUrl || ''
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

const sendApplicationEmail = async (data) => {
  try {
    // This function is no longer used in the new implementation
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

const saveApplication = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to save application');
    }

    window.alert('Application submitted successfully!');
    window.location.href = '/';
  } catch (error) {
    console.error('Storage error:', error);
    window.alert('Failed to submit application. Please try again.');
  }
};

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = useForm();

  const sampleData = {
    companyName: "Cursor AI",
    websiteUrl: "cursor.ai",
    founderName: "John Danner",
    email: "john@danners.org",
    deckUrl: "https://docs.google.com/presentation/d/1234",
    videoUrl: "https://loom.com/share/1234",
    need: 80,
    valueProposition: 75,
    magic: 70,
    activation: 65,
    intrigued: 60,
    habit: 55,
    growthLoops: 0.6,
    growth: 15,
    channel: 800,
    engagement: 5,
    monetization: 7,
    experimentsPerWeek: 3
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check for Ctrl+D (or Cmd+D on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault(); // Prevent browser's default "bookmark" action
        reset(sampleData);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [reset]);

  useEffect(() => {
    // Initialize immediately when component mounts
    window.emailjs.init("KnFnlHEmTFfBtgae-");
  }, []);

  const validateUrl = (value) => {
    if (!value) return true; // Optional URLs pass
    
    // Add https:// if missing
    const url = value.startsWith('http') ? value : `https://${value}`;
    
    // Basic domain validation - requires at least one dot and common TLD
    const commonTLDs = ['com', 'org', 'net', 'edu', 'io', 'app', 'dev', 'ai', 'co'];
    const domainPattern = new RegExp(
      `^https?://.+\\.(${commonTLDs.join('|')})(?:/.*)?$`,
      'i'
    );
    
    return domainPattern.test(url);
  };

  const onSubmit = async (data) => {
    try {
      console.log('Starting submit...');
      
      // First upload any files and get back URLs
      const fileUrls = await uploadFiles(data);
      
      const emailData = {
        from_name: "Application Form",
        company_name: data.companyName,
        website: data.websiteUrl,
        founder: data.founderName,
        email: data.email,
        // Use the URLs from file uploads
        deck_url: fileUrls.deckUrl || 'Not provided',
        video_url: fileUrls.videoUrl || 'Not provided', 
        experiments_url: fileUrls.experimentUrl || 'Not provided',
        metrics: `Need: ${data.need}%
Value Proposition: ${data.valueProposition}%
Magic: ${data.magic}%
Activation: ${data.activation}%
Intrigued: ${data.intrigued}%
Habit: ${data.habit}%
Growth Loops: ${data.growthLoops}
Growth: ${data.growth}%
Channel: ${data.channel}
Engagement: ${data.engagement}
Monetization: ${data.monetization}%

Experiments per Week: ${data.experimentsPerWeek}`,
        to_email: "john@danners.org"
      };
      
      console.log('About to send email with uploaded files:', fileUrls);
      
      emailjs.send("service_gl3xzva", "template_h62tu28", emailData).then(
        function(response) {
          console.log("SUCCESS", response);
          alert("Email sent successfully!");
          window.location.href = '/';
        },
        function(error) {
          console.log("FAILED", error);
          alert("Failed to send email: " + JSON.stringify(error));
        }
      );
    } catch (error) {
      console.error('Top level error:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const metrics = [
    {
      stage: 'Need',
      name: 'need',
      metric: '% of ICPs who visibly get excited (not just polite) when the pain point is described',
      type: 'percentage'
    },
    {
      stage: 'Value Proposition',
      name: 'valueProposition',
      metric: '% of visitors who experience the magic',
      type: 'percentage'
    },
    {
      stage: 'Magic',
      name: 'magic',
      metric: '% of visitors who see your magic who take the next step',
      type: 'percentage'
    },
    {
      stage: 'Activation',
      name: 'activation',
      metric: '% of visitors who saw your magic, who successfully became active users',
      type: 'percentage'
    },
    {
      stage: 'Intrigued',
      name: 'intrigued',
      metric: '% of activated users who retain Day 7',
      type: 'percentage'
    },
    {
      stage: 'Habit',
      name: 'habit',
      metric: '% of Day 7 users who retain Day 30',
      type: 'percentage'
    },
    {
      stage: 'Growth Loops',
      name: 'growthLoops',
      metric: 'How many additional users does each new user create?',
      type: 'decimal'
    },
    {
      stage: 'Growth',
      name: 'growth',
      metric: 'Month over Month organic growth (exclude paid growth)',
      type: 'percentage'
    },
    {
      stage: 'Channel',
      name: 'channel',
      metric: 'Number of daily organic visitors (excluding growth loops)',
      type: 'number'
    },
    {
      stage: 'Engagement',
      name: 'engagement',
      metric: 'How many times do active users visit app per week?',
      type: 'number'
    },
    {
      stage: 'Monetization',
      name: 'monetization',
      metric: '% top of funnel who become paid customers',
      type: 'percentage'
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">Startup Application</h1>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow">
                {/* Company Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Company Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      {...register('companyName', { required: true })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website URL</label>
                    <input
                      type="text"
                      {...register('websiteUrl', { 
                        required: true,
                        validate: validateUrl
                      })}
                      placeholder="example.com"
                      className={`mt-1 block w-full rounded-md border ${
                        errors.websiteUrl ? 'border-red-500' : 'border-gray-300'
                      } px-3 py-2`}
                    />
                    {errors.websiteUrl && (
                      <p className="mt-1 text-xs text-red-500">
                        Please enter a valid website URL
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Founder Name</label>
                    <input
                      type="text"
                      {...register('founderName', { required: true })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      {...register('email', { required: true })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>

                {/* Updated File Upload Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Documents</h2>
                  
                  {/* Deck/Memo Section */}
                  <div className="space-y-2 border border-gray-400 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700">Deck/Memo (Required)</label>
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <input
                          type="file"
                          accept=".pdf,.ppt,.pptx"
                          {...register('deckFile')}
                          className={`flex-1 ${watch('deckUrl') ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!!watch('deckUrl')}
                        />
                        {watch('deckFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('deckFile', null);
                              document.querySelector('input[name="deckFile"]').value = '';
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear file"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-medium text-center">OR</div>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          {...register('deckUrl')}
                          placeholder="Enter deck URL"
                          className={`flex-1 rounded-md border ${
                            errors.deckUrl ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 ${watch('deckFile')?.[0] ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                          disabled={!!watch('deckFile')?.[0]}
                        />
                        {watch('deckUrl') && !watch('deckFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('deckUrl', '');
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear URL"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {errors.deckUrl && (
                        <p className="mt-1 text-xs text-red-500">{errors.deckUrl.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Demo Video Section */}
                  <div className="space-y-2 border border-gray-400 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700">Demo Video/Loom (Optional)</label>
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <input
                          type="file"
                          accept="video/*"
                          {...register('videoFile')}
                          className={`flex-1 ${watch('videoUrl') ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!!watch('videoUrl')}
                        />
                        {watch('videoFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('videoFile', null);
                              document.querySelector('input[name="videoFile"]').value = '';
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear file"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-medium text-center">OR</div>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          {...register('videoUrl')}
                          placeholder="Enter video URL (e.g., loom.com/share/...)"
                          className={`flex-1 rounded-md border ${
                            errors.videoUrl ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 ${watch('videoFile')?.[0] ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                          disabled={!!watch('videoFile')?.[0]}
                        />
                        {watch('videoUrl') && !watch('videoFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('videoUrl', '');
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear URL"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {errors.videoUrl && (
                        <p className="mt-1 text-xs text-red-500">{errors.videoUrl.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Experiment Dashboard Section */}
                  <div className="space-y-2 border border-gray-400 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">Experiment Dashboard (Optional)</label>
                      <a 
                        href="https://docs.google.com/spreadsheets/d/1zVD9nHWNkp66ZjnVhAr6nZWDm3UOH7UC6cRy9LzDHjk/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        title="View sample experiment dashboard"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                      </a>
                    </div>
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          {...register('experimentFile')}
                          className={`flex-1 ${watch('experimentUrl') ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!!watch('experimentUrl')}
                        />
                        {watch('experimentFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('experimentFile', null);
                              document.querySelector('input[name="experimentFile"]').value = '';
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear file"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-medium text-center">OR</div>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          {...register('experimentUrl')}
                          placeholder="Enter dashboard URL"
                          className={`flex-1 rounded-md border ${
                            errors.experimentUrl ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 ${watch('experimentFile')?.[0] ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                          disabled={!!watch('experimentFile')?.[0]}
                        />
                        {watch('experimentUrl') && !watch('experimentFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('experimentUrl', '');
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear URL"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {errors.experimentUrl && (
                        <p className="mt-1 text-xs text-red-500">{errors.experimentUrl.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Metrics</h2>
                  
                  {metrics.map(({ stage, name, metric, type }) => (
                    <div key={name} className="space-y-2">
                      <div className="flex items-center">
                        <label className="block text-sm font-medium text-gray-700">
                          {stage}
                        </label>
                      </div>
                      <div className="text-xs text-gray-500 italic mb-1">
                        {metric}
                      </div>
                      <input
                        type="number"
                        step={type === 'percentage' ? '0.1' : type === 'decimal' ? '0.01' : '1'}
                        min="0"
                        max={type === 'percentage' ? "100" : type === 'decimal' ? "1" : undefined}
                        {...register(name, { required: true })}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  ))}

                  {/* Analytics Screenshots Section */}
                  <div className="space-y-2 border border-gray-400 rounded-lg p-4 mt-4">
                    <label className="block text-sm font-medium text-gray-700">Analytics Screenshots</label>
                    <div className="text-xs text-gray-500 italic mb-2">
                      Please provide screenshots validating your metrics (e.g. Google Analytics, Mixpanel, etc.)
                    </div>
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <input
                          type="file"
                          accept=".zip"
                          {...register('analyticsFile')}
                          className={`flex-1 ${watch('analyticsUrl') ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!!watch('analyticsUrl')}
                        />
                        {watch('analyticsFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('analyticsFile', null);
                              document.querySelector('input[name="analyticsFile"]').value = '';
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear file"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-medium text-center">OR</div>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          {...register('analyticsUrl')}
                          placeholder="Enter link to analytics screenshots"
                          className={`flex-1 rounded-md border ${
                            errors.analyticsUrl ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 ${watch('analyticsFile')?.[0] ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                          disabled={!!watch('analyticsFile')?.[0]}
                        />
                        {watch('analyticsUrl') && !watch('analyticsFile')?.[0] && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('analyticsUrl', '');
                            }}
                            className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            title="Clear URL"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {errors.analyticsUrl && (
                        <p className="mt-1 text-xs text-red-500">{errors.analyticsUrl.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experiments per Week</label>
                    <input
                      type="number"
                      min="0"
                      {...register('experimentsPerWeek', { required: true })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-md py-2 px-4`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        } />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App; 