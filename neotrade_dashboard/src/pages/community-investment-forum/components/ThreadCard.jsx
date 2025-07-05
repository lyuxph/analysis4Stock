import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ThreadCard = ({ 
  thread, 
  onLike, 
  onBookmark, 
  onView, 
  onClick, 
  formatTimeAgo 
}) => {
  const handleCardClick = () => {
    onView();
    onClick();
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  const getReputationColor = (reputation) => {
    if (reputation >= 1000) return 'text-warning';
    if (reputation >= 500) return 'text-primary';
    return 'text-text-secondary';
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card p-6 rounded-lg hover:bg-surface/50 transition-all duration-200 cursor-pointer group"
    >
      {/* Pinned Badge */}
      {thread.isPinned && (
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Pin" size={16} className="text-warning" />
          <span className="text-xs font-medium text-warning uppercase tracking-wide">Pinned</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <Image
            src={thread.author.avatar}
            alt={thread.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-text-primary truncate">
              {thread.author.name}
            </h3>
            <span className={`text-xs font-medium ${getReputationColor(thread.author.reputation)}`}>
              {thread.author.reputation}
            </span>
            <span className="text-xs text-text-secondary px-2 py-1 bg-surface/50 rounded-full">
              {thread.author.badge}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <span>{formatTimeAgo(thread.createdAt)}</span>
            {thread.updatedAt > thread.createdAt && (
              <>
                <span>•</span>
                <span>Updated {formatTimeAgo(thread.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
        {thread.title}
      </h2>

      {/* Content Preview */}
      <div className="text-text-secondary mb-4 leading-relaxed">
        {truncateContent(thread.content)}
      </div>

      {/* Tags */}
      {thread.tags && thread.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {thread.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={(e) => handleActionClick(e, onLike)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              thread.hasUserLiked 
                ? 'text-error' :'text-text-secondary hover:text-error'
            }`}
          >
            <Icon 
              name={thread.hasUserLiked ? "Heart" : "Heart"} 
              size={16} 
              className={thread.hasUserLiked ? "fill-current" : ""} 
            />
            <span>{thread.stats.likes}</span>
          </button>

          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <Icon name="MessageCircle" size={16} />
            <span>{thread.stats.replies}</span>
          </div>

          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <Icon name="Eye" size={16} />
            <span>{thread.stats.views}</span>
          </div>
        </div>

        <button
          onClick={(e) => handleActionClick(e, onBookmark)}
          className={`p-2 rounded-lg transition-colors ${
            thread.hasUserBookmarked
              ? 'text-warning bg-warning/10' :'text-text-secondary hover:text-warning hover:bg-warning/10'
          }`}
        >
          <Icon 
            name="Bookmark" 
            size={16} 
            className={thread.hasUserBookmarked ? "fill-current" : ""} 
          />
        </button>
      </div>
    </div>
  );
};

export default ThreadCard;