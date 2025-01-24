import { useRef, useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { AdminSettings as SettingsType } from '../../types';

const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingsType>({
    siteName: '',
    siteDescription: '',
    logo: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      facebook: ''
    },
    contactEmail: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error loading settings:', error);
        alert('Error loading settings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('logo', file);

        const response = await fetch('/api/settings/logo', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload logo');
        const data = await response.json();
        
        setSettings(prev => ({ ...prev, logo: data.logoUrl }));
      } catch (error) {
        console.error('Error uploading logo:', error);
        alert('Error uploading logo. Please try again.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');
      const updatedSettings = await response.json();
      setSettings(updatedSettings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading settings...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">General Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={e => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={e => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Logo
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center space-x-4">
                {settings.logo && (
                  <img
                    src={settings.logo}
                    alt="Site Logo"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Social Media Links</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={settings.socialLinks.instagram}
                onChange={e => setSettings(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={settings.socialLinks.twitter}
                onChange={e => setSettings(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={settings.socialLinks.facebook}
                onChange={e => setSettings(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                }))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Contact Settings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={e => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`bg-[#FFD513] text-black px-6 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;