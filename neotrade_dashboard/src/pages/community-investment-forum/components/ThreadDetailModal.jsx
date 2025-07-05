import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ThreadDetailModal = ({ 
  thread, 
  onClose, 
  onLike, 
  onBookmark, 
  formatTimeAgo 
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replies, setReplies] = useState([
    {
      id: 1,
      content: `Great analysis! I've been watching Tesla closely too. The delivery numbers were impressive, but I'm concerned about the margin compression you mentioned. 

Do you think the price cuts will continue to impact profitability in Q1?`,
      author: {
        id: 'user6',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
        reputation: 750,
        badge: 'Active Trader'
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      stats: {
        likes: 8,
        replies: 2
      },
      hasUserLiked: false
    },
    {
      id: 2,
      content: `I'm bullish on TSLA long-term. The FSD progress is underestimated by the market. Once they achieve full autonomy, the revenue model completely changes.

Energy business is also showing strong growth - often overlooked by analysts.`,
      author: {
        id: 'user7',name: 'Robert Kim',avatar: 'https://randomuser.me/api/portraits/men/38.jpg',reputation: 1450,badge: 'Expert Trader'
      },
      createdAt: new Date(Date.now() - 45 * 60 * 1000),
      stats: {
        likes: 12,
        replies: 0
      },
      hasUserLiked: true
    }
  ]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmittingReply(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReply = {
      id: replies.length + 1,
      content: replyContent,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        reputation: 320,
        badge: 'Member'
      },
      createdAt: new Date(),
      stats: {
        likes: 0,
        replies: 0
      },
      hasUserLiked: false
    };

    setReplies(prev => [...prev, newReply]);
    setReplyContent('');
    setIsSubmittingReply(false);
  };

  const handleReplyLike = (replyId) => {
    setReplies(prev => prev.map(reply => {
      if (reply.id === replyId) {
        return {
          ...reply,
          hasUserLiked: !reply.hasUserLiked,
          stats: {
            ...reply.stats,
            likes: reply.hasUserLiked ? reply.stats.likes - 1 : reply.stats.likes + 1
          }
        };
      }
      return reply;
    }));
  };

  const getReputationColor = (reputation) => {
    if (reputation >= 1000) return 'text-warning';
    if (reputation >= 500) return 'text-primary';
    return 'text-text-secondary';
  };

  return (
    <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full max-h-[90vh] glass-card rounded-lg shadow-strong animate-fade-in-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-secondary" />
            </button>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Discussion
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onBookmark}
              className={`p-2 rounded-lg transition-colors ${
                thread.hasUserBookmarked
                  ? 'text-warning bg-warning/10' :'text-text-secondary hover:text-warning hover:bg-warning/10'
              }`}
            >
              <Icon 
                name="Bookmark" 
                size={20} 
                className={thread.hasUserBookmarked ? "fill-current" : ""} 
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Original Post */}
          <div className="p-6 border-b border-glass-border">
            {/* Pinned Badge */}
            {thread.isPinned && (
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Pin" size={16} className="text-warning" />
                <span className="text-xs font-medium text-warning uppercase tracking-wide">Pinned</span>
              </div>
            )}

            {/* Author Info */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={thread.author.avatar}
                alt={thread.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-text-primary">
                    {thread.author.name}
                  </h3>
                  <span className={`text-xs font-medium ${getReputationColor(thread.author.reputation)}`}>
                    {thread.author.reputation}
                  </span>
                  <span className="text-xs text-text-secondary px-2 py-1 bg-surface/50 rounded-full">
                    {thread.author.badge}
                  </span>
                </div>
                <div className="text-xs text-text-secondary">
                  {formatTimeAgo(thread.createdAt)}
                  {thread.updatedAt > thread.createdAt && (
                    <span> • Updated {formatTimeAgo(thread.updatedAt)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-4">
              {thread.title}
            </h1>

            {/* Content */}
            <div className="text-text-secondary mb-6 leading-relaxed whitespace-pre-line">
              {thread.content}
            </div>

            {/* Tags */}
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
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

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={onLike}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    thread.hasUserLiked 
                      ? 'text-error bg-error/10' :'text-text-secondary hover:text-error hover:bg-error/10'
                  }`}
                >
                  <Icon 
                    name="Heart" 
                    size={16} 
                    className={thread.hasUserLiked ? "fill-current" : ""} 
                  />
                  <span>{thread.stats.likes}</span>
                </button>

                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="MessageCircle" size={16} />
                  <span>{thread.stats.replies} replies</span>
                </div>

                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="Eye" size={16} />
                  <span>{thread.stats.views} views</span>
                </div>
              </div>

              <button className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors">
                <Icon name="Share" size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Replies */}
          <div className="p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
              Replies ({replies.length})
            </h3>

            <div className="space-y-6">
              {replies.map((reply) => (
                <div key={reply.id} className="flex items-start space-x-4">
                  <Image
                    src={reply.author.avatar}
                    alt={reply.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-text-primary">
                        {reply.author.name}
                      </h4>
                      <span className={`text-xs font-medium ${getReputationColor(reply.author.reputation)}`}>
                        {reply.author.reputation}
                      </span>
                      <span className="text-xs text-text-secondary px-2 py-1 bg-surface/50 rounded-full">
                        {reply.author.badge}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(reply.createdAt)}
                      </span>
                    </div>
                    <div className="text-text-secondary mb-3 leading-relaxed whitespace-pre-line">
                      {reply.content}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleReplyLike(reply.id)}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          reply.hasUserLiked 
                            ? 'text-error' :'text-text-secondary hover:text-error'
                        }`}
                      >
                        <Icon 
                          name="Heart" 
                          size={14} 
                          className={reply.hasUserLiked ? "fill-current" : ""} 
                        />
                        <span>{reply.stats.likes}</span>
                      </button>
                      <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reply Form */}
        <div className="p-6 border-t border-glass-border flex-shrink-0">
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-3 glass-card rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmittingReply || !replyContent.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingReply && <Icon name="Loader2" size={16} className="animate-spin" />}
                <span>{isSubmittingReply ? 'Posting...' : 'Post Reply'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetailModal;