import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AccountSettings = ({ userData, onDataChange }) => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    bio: userData.bio,
    investmentExperience: userData.investmentExperience
  });

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-2 years)', description: 'New to investing, learning the basics' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)', description: 'Some experience with various investment types' },
    { value: 'advanced', label: 'Advanced (5+ years)', description: 'Experienced with complex strategies and analysis' },
    { value: 'professional', label: 'Professional', description: 'Finance industry professional or institutional investor' }
  ];

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onDataChange({ avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    setIsEditingAvatar(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Profile Photo</h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
              <Image 
                src={userData.avatar} 
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setIsEditingAvatar(true)}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
            >
              <Icon name="Camera" size={16} color="white" />
            </button>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-2">Update your photo</h4>
            <p className="text-sm text-text-secondary mb-4">
              Choose a clear, professional photo that represents you well in the community.
            </p>
            <div className="flex space-x-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <span className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
                  <Icon name="Upload" size={16} />
                  <span>Upload New</span>
                </span>
              </label>
              <button className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Investment Experience
            </label>
            <select
              value={formData.investmentExperience}
              onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-text-secondary mt-1">
              {experienceLevels.find(l => l.value === formData.investmentExperience)?.description}
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Tell the community about your investment journey and interests..."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-text-secondary">
              Share your investment philosophy and what drives your trading decisions.
            </p>
            <span className="text-xs text-text-secondary">
              {formData.bio.length}/500
            </span>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Account Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{userData.totalPosts}</div>
            <div className="text-sm text-text-secondary">Forum Posts</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">{userData.totalStrategies}</div>
            <div className="text-sm text-text-secondary">Strategies Shared</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">{userData.followers.toLocaleString()}</div>
            <div className="text-sm text-text-secondary">Followers</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">
              {Math.floor((Date.now() - new Date(userData.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-sm text-text-secondary">Days Active</div>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Data Export</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Portfolio Data</h4>
              <p className="text-sm text-text-secondary">Export your complete portfolio history and performance data</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
              <Icon name="Download" size={16} />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Account Data</h4>
              <p className="text-sm text-text-secondary">Download all your account information and activity</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
              <Icon name="Download" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;