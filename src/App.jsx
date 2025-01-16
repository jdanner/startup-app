import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
const EMAIL_SERVICE_ID = 'service_gl3xzva';
const EMAIL_TEMPLATE_ID = 'template_h62tu28';
const EMAIL_PUBLIC_KEY = '12DTBz2EjgKE1P3Ef';

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
  return data.url;
};

const uploadFiles = async (data) => {
  try {
    const [deckFile, videoFile, experimentFile] = await Promise.all([
      data.deckFile?.[0] ? uploadFile(data.deckFile[0]) : null,
      data.videoFile?.[0] ? uploadFile(data.videoFile[0]) : null,
      data.experimentFile?.[0] ? uploadFile(data.experimentFile[0]) : null
    ]);

    return {
      deckUrl: deckFile || data.deckUrl || '',
      videoUrl: videoFile || data.videoUrl || '',
      experimentUrl: experimentFile || data.experimentUrl || ''
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

const sendApplicationEmail = async (data) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      {
        company_name: data.companyName,
        website: data.websiteUrl,
        founder: data.founderName,
        email: data.email,
        deck_url: data.deckUrl || 'File uploaded',
        video_url: data.videoUrl || 'None',
        experiments_url: data.experimentUrl || 'None',
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

Experiments per Week: ${data.experimentsPerWeek}`
      },
      EMAIL_PUBLIC_KEY
    );
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

const saveApplication = async (data) => {
  try {
    const response = await fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

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
      if (e.key.toLowerCase() === 'd') {
        reset(sampleData);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [reset]);

  useEffect(() => {
    emailjs.init(EMAIL_PUBLIC_KEY);
  }, []);

  const validateUrl = (value) => {
    if (!value) return true; // Optional URLs pass
    
    // Add https:// if missing
    const url = value.startsWith('http') ? value : `https://${value}`;
    
    // Basic domain validation - requires at least one dot and common TLD
    const commonTLDs = ['com', 'org', 'net', 'edu', 'io', 'app', 'dev', 'ai', 'co'];
    const domainPattern = new RegExp(
      `^https?:\/\/.+\.(${commonTLDs.join('|')})(?:\/.*)?$`,
      'i'
    );
    
    return domainPattern.test(url);
  };

  const onSubmit = async (data) => {
    try {
      // 1. Upload any files to Render storage
      const fileUrls = await uploadFiles(data);
      
      // 2. Store application data
      await saveApplication({
        ...data,
        ...fileUrls
      });
      
      // 3. Send email with application details
      await sendApplicationEmail({
        ...data,
        ...fileUrls
      });
      
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
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
      metric: 'Number of non-growth loop organic visitors coming to site',
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Deck/Memo (Required)</label>
              <div className="space-y-2">
                <div>
                  <input
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    {...register('deckFile')}
                    className="mt-1 block w-full"
                  />
                </div>
                <div className="- mt-1">
                  <div className="text-sm text-gray-500">Or provide a link:</div>
                  <input
                    type="text"
                    {...register('deckUrl', { 
                      validate: (value) => {
                        const fileUploaded = !!document.querySelector('input[name="deckFile"]').files[0];
                        if (!fileUploaded && !value) {
                          return 'Either a file or URL is required';
                        }
                        if (!value) return true;
                        return validateUrl(value);
                      }
                    })}
                    placeholder="link to your deck/memo"
                    className={`mt-1 block w-full rounded-md border ${
                      errors.deckUrl ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2`}
                  />
                  {errors.deckUrl && (
                    <p className="mt-1 text-xs text-red-500">{errors.deckUrl.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Demo Video Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Demo Video/Loom (Optional)</label>
              <div className="space-y-2">
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    {...register('videoFile')}
                    className="mt-1 block w-full"
                  />
                </div>
                <div className="- mt-1">
                  <div className="text-sm text-gray-500">Or provide a link:</div>
                  <input
                    type="text"
                    {...register('videoUrl', { 
                      validate: value => !value || validateUrl(value)
                    })}
                    placeholder="loom.com/share/your-video"
                    className={`mt-1 block w-full rounded-md border ${
                      errors.videoUrl ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2`}
                  />
                  {errors.videoUrl && (
                    <p className="mt-1 text-xs text-red-500">Please enter a valid video URL</p>
                  )}
                </div>
              </div>
            </div>

            {/* Experiment Documentation Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Experiment Documentation (Optional)</label>
              <div className="space-y-2">
                <div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    {...register('experimentFile')}
                    className="mt-1 block w-full"
                  />
                </div>
                <div className="- mt-1">
                  <div className="text-sm text-gray-500">Or provide a link:</div>
                  <input
                    type="text"
                    {...register('experimentUrl', { 
                      validate: value => !value || validateUrl(value)
                    })}
                    placeholder="link to your experiment documentation"
                    className={`mt-1 block w-full rounded-md border ${
                      errors.experimentUrl ? 'border-red-500' : 'border-gray-300'
                    } px-3 py-2`}
                  />
                  {errors.experimentUrl && (
                    <p className="mt-1 text-xs text-red-500">Please enter a valid URL</p>
                  )}
                </div>
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
  );
}

export default App; 