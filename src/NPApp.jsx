import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { API_URL } from './config';

const saveApplication = async (data) => {
  try {
    const response = await fetch(`${API_URL}/api/applications`, {
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
  } catch (error) {
    console.error('Storage error:', error);
    window.alert('Failed to submit application. Please try again.');
  }
};

function NonProfitForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const sampleData = {
    organizationName: "Khan Academy",
    website: "khanacademy.org",
    founder: "Sal Khan",
    email: "john@danners.org",
    mission: "Khan Academy creates a set of online tools that help educate students. Khan Academy has produced over 2400 videos that have been viewed more than 41 million times. These videos are viewable for free by anyone in the world."
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        reset(sampleData);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [reset]);

  useEffect(() => {
    emailjs.init({
      publicKey: "KnFnlHEmTFfBtgae-"
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      const applicationData = {
        ...data,
        type: 'non-profit',
        timestamp: new Date().toISOString()
      };
      
      await saveApplication(applicationData);

      const emailData = {
        company_name: data.organizationName,
        website: data.website,
        founder: data.founder,
        email: data.email,
        mission: data.mission,
        to_email: "john@danners.org"
      };

      try {
        const emailResponse = await emailjs.send(
          "service_gl3xzva", 
          "template_rptldnr",
          emailData
        );
        console.log("Email sent successfully:", emailResponse);
        
        window.location.href = '/';
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        throw new Error('Failed to send email notification');
      }

    } catch (error) {
      console.error('Error in submission:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Non-Profit Application</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Organization Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                {...register('organizationName', { required: 'Organization name is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.organizationName && (
                <p className="mt-1 text-xs text-red-500">{errors.organizationName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                {...register('website', { required: 'Website is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.website && (
                <p className="mt-1 text-xs text-red-500">{errors.website.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Founder</label>
              <input
                type="text"
                {...register('founder', { required: 'Founder name is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.founder && (
                <p className="mt-1 text-xs text-red-500">{errors.founder.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Mission</label>
              <textarea
                {...register('mission', { 
                  required: 'Mission statement is required',
                  minLength: {
                    value: 100,
                    message: 'Please provide at least 100 characters'
                  }
                })}
                rows={6}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Describe your organization's mission and how you create lasting positive impact through education..."
              />
              {errors.mission && (
                <p className="mt-1 text-xs text-red-500">{errors.mission.message}</p>
              )}
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

export default NonProfitForm; 