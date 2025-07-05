import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingTopics = () => {
  const trendingTopics = [
    { tag: 'TSLA', posts: 45, change: '+12%' },
    { tag: 'AI-stocks', posts: 38, change: '+8%' },
    { tag: 'earnings', posts: 32, change: '+15%' },
    { tag: 'dividends', posts: 28, change: '+5%' },
    { tag: 'crypto', posts: 24, change: '-3%' },
    { tag: 'NVDA', posts: 22, change: '+20%' },
    { tag: 'market-analysis', posts: 19, change: '+7%' },
    { tag: 'options', posts: 16, change: '+10%' }
  ];

  const hotDiscussions = [
    {
      title: "Fed Rate Decision Impact",
      replies: 89,
      timeAgo: "2h ago"
    },
    {
      title: "Tech Earnings Season Preview",
      replies: 67,
      timeAgo: "4h ago"
    },
    {
      title: "Oil Price Volatility Analysis",
      replies: 54,
      timeAgo: "6h ago"
    },
    {
      title: "Crypto Market Recovery?",
      replies: 43,
      timeAgo: "8h ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Tags */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Trending Topics
          </h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-primary">
                  #{topic.tag}
                </span>
                <span className="text-xs text-text-secondary">
                  {topic.posts} posts
                </span>
              </div>
              <span className={`text-xs font-medium ${
                topic.change.startsWith('+') ? 'text-success' : 'text-error'
              }`}>
                {topic.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Discussions */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Flame" size={20} className="text-warning" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Hot Discussions
          </h3>
        </div>
        <div className="space-y-3">
          {hotDiscussions.map((discussion, index) => (
            <div key={index} className="cursor-pointer hover:bg-surface/30 p-2 rounded-lg transition-colors">
              <div className="font-medium text-text-primary text-sm mb-1">
                {discussion.title}
              </div>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="MessageCircle" size={12} />
                <span>{discussion.replies} replies</span>
                <span>•</span>
                <span>{discussion.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-secondary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Community Sentiment
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Bullish</span>
              <span className="text-sm font-medium text-success">68%</span>
            </div>
            <div className="w-full bg-surface/50 rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Bearish</span>
              <span className="text-sm font-medium text-error">22%</span>
            </div>
            <div className="w-full bg-surface/50 rounded-full h-2">
              <div className="bg-error h-2 rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Neutral</span>
              <span className="text-sm font-medium text-warning">10%</span>
            </div>
            <div className="w-full bg-surface/50 rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="glass-card p-4 rounded-lg border border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Trophy" size={20} className="text-warning" />
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Weekly Challenge
            </h3>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Predict this week's top performing sector and win premium access!
          </p>
          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;