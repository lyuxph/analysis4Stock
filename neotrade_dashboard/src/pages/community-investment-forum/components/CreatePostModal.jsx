import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CreatePostModal = ({ onClose, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general-discussion',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would normally submit to your backend
    console.log('New post:', {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-card rounded-lg shadow-strong animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Create New Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What's your discussion about?"
              className="w-full px-4 py-3 glass-card rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 glass-card rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-surface">
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Share your thoughts, analysis, or questions..."
              rows={8}
              className="w-full px-4 py-3 glass-card rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              required
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <button
                  type="button"
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <Icon name="Bold" size={16} />
                  <span>Bold</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <Icon name="Italic" size={16} />
                  <span>Italic</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors"
                >
                  <Icon name="Link" size={16} />
                  <span>Link</span>
                </button>
              </div>
              <span className="text-sm text-text-secondary">
                {formData.content.length}/2000
              </span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="e.g., AAPL, earnings, tech (comma separated)"
              className="w-full px-4 py-3 glass-card rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-text-secondary mt-1">
              Add relevant tags to help others find your post
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.content}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Icon name="Loader2" size={16} className="animate-spin" />}
              <span>{isSubmitting ? 'Publishing...' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;