import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySidebar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="glass-card p-4 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={category.icon} size={16} />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-xs bg-surface/50 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass-card p-4 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Community Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Total Posts</span>
            <span className="font-medium text-text-primary">2,847</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Active Users</span>
            <span className="font-medium text-text-primary">1,234</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Today's Posts</span>
            <span className="font-medium text-success">47</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Online Now</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full pulse-glow"></div>
              <span className="font-medium text-success">89</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="glass-card p-4 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Top Contributors
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Michael Chen', posts: 156, reputation: 1250 },
            { name: 'Sarah Williams', posts: 134, reputation: 890 },
            { name: 'Jennifer Park', posts: 98, reputation: 1100 }
          ].map((contributor, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-text-primary text-sm">
                  {contributor.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {contributor.posts} posts • {contributor.reputation} rep
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;