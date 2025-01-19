import { useState } from 'react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    deck: null,
    deckLink: '',
    channel: '',
    analytics: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... existing submission logic ...
    
    // After successful submission, redirect to home page
    window.location.href = 'https://danners.org';
  };

  const handleFileSelect = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Clear any existing link when file is selected
      setFormData(prev => ({
        ...prev,
        [field]: file,
        [`${field}Link`]: ''
      }));
      
      // Clear the link input value
      const linkInput = document.querySelector(`input[name="${field}Link"]`);
      if (linkInput) linkInput.value = '';
    }
  };

  const handleLinkInput = (e, field) => {
    const link = e.target.value;
    if (link) {
      // Clear any existing file when link is entered
      setFormData(prev => ({
        ...prev,
        [field]: null,
        [`${field}Link`]: link
      }));
      
      // Clear the file input value
      const fileInput = document.querySelector(`input[name="${field}File"]`);
      if (fileInput) fileInput.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... existing form fields ... */}

      {/* Deck Upload Section */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Deck/Memo Upload</label>
        <div className="flex items-center gap-4 relative">
          <div className="flex-1">
            <input
              type="file"
              name="deckFile"
              onChange={(e) => handleFileSelect(e, 'deck')}
              className={`w-full ${formData.deckLink ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!!formData.deckLink}
              accept=".pdf,.ppt,.pptx,.doc,.docx"
            />
          </div>
          <div className="text-gray-500 font-bold">OR</div>
          <div className="flex-1">
            <input
              type="text"
              name="deckLink"
              placeholder="Enter deck URL"
              value={formData.deckLink}
              onChange={(e) => handleLinkInput(e, 'deck')}
              className={`w-full p-2 border rounded ${formData.deck ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!!formData.deck}
            />
          </div>
          {(formData.deck || formData.deckLink) && (
            <button 
              type="button" 
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  deck: null,
                  deckLink: ''
                }));
                // Clear both inputs
                const fileInput = document.querySelector('input[name="deckFile"]');
                const linkInput = document.querySelector('input[name="deckLink"]');
                if (fileInput) fileInput.value = '';
                if (linkInput) linkInput.value = '';
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-full w-6 h-6 flex items-center justify-center"
              title="Clear selection"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Channel Metric */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" title="Drive 1000 organic daily visitors to your site">
          Channel (Daily Organic Visitors)
        </label>
        <input
          type="number"
          value={formData.channel}
          onChange={(e) => handleInputChange('channel', e.target.value)}
          className="w-full p-2 border rounded"
          required
          min="0"
          placeholder="Enter number of daily organic visitors"
        />
      </div>

      {/* Analytics Screenshots Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Analytics Screenshots (ZIP file supporting your metrics)
        </label>
        <input
          type="file"
          accept=".zip"
          onChange={(e) => handleFileSelect(e, 'analytics')}
          className="w-full"
        />
      </div>

      {/* ... rest of the form ... */}
    </form>
  );
} 