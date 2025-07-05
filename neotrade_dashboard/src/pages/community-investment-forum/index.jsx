import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';

import ThreadCard from './components/ThreadCard';
import CreatePostModal from './components/CreatePostModal';
import ThreadDetailModal from './components/ThreadDetailModal';
import CategorySidebar from './components/CategorySidebar';
import TrendingTopics from './components/TrendingTopics';

const CommunityInvestmentForum = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [userSubscription, setUserSubscription] = useState('free'); // 'free', 'premium'

  // Mock data for forum threads
  const mockThreads = [
    {
      id: 1,
      title: "Tesla\'s Q4 Earnings - What to Expect?",
      content: `Tesla is set to report Q4 earnings next week. Based on delivery numbers and recent market conditions, I'm expecting some volatility. 

Key factors to watch:
- Delivery guidance for 2024
- Margin compression concerns
- FSD revenue recognition
- Energy business performance

What are your thoughts on TSLA's outlook?`,
      author: {
        id: 'user1',
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        reputation: 1250,
        badge: 'Expert Trader'
      },
      category: 'stock-analysis',
      tags: ['TSLA', 'earnings', 'EV'],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      stats: {
        likes: 24,
        replies: 18,
        views: 342,
        bookmarks: 7
      },
      isPinned: true,
      hasUserLiked: false,
      hasUserBookmarked: false
    },
    {
      id: 2,
      title: "Market Correction Incoming? Technical Analysis",
      content: `Looking at the current market structure, I'm seeing some concerning patterns:📊 Technical Indicators:- RSI approaching overbought levels on major indices- Volume declining on recent rallies- VIX showing unusual patterns📈 Key Levels to Watch:- S&P 500: 4,800 support level- NASDAQ: 15,000 psychological support- Russell 2000: Breaking below 2,000What's your take on current market conditions? Are we due for a correction?`,
      author: {
        id: 'user2',
        name: 'Sarah Williams',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        reputation: 890,
        badge: 'Technical Analyst'
      },
      category: 'market-news',
      tags: ['SPY', 'QQQ', 'technical-analysis', 'correction'],
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      stats: {
        likes: 31,
        replies: 25,
        views: 567,
        bookmarks: 12
      },
      isPinned: false,
      hasUserLiked: true,
      hasUserBookmarked: true
    },
    {
      id: 3,
      title: "AI Stocks Rally - Which Ones to Watch?",
      content: `The AI sector is heating up again! Here are some names I'm tracking:

🚀 Large Caps:
- NVDA: Still the king of AI chips
- MSFT: Azure AI services growing rapidly
- GOOGL: Bard and AI integration across products

💎 Mid/Small Caps:
- PLTR: Government AI contracts
- SNOW: Data cloud for AI workloads
- CRWD: AI-powered cybersecurity

Anyone else playing the AI theme? What's your favorite pick?`,
      author: {
        id: 'user3',
        name: 'David Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
        reputation: 650,
        badge: 'Growth Investor'
      },
      category: 'strategy-sharing',
      tags: ['AI', 'NVDA', 'MSFT', 'growth'],
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      stats: {
        likes: 19,
        replies: 14,
        views: 289,
        bookmarks: 8
      },
      isPinned: false,
      hasUserLiked: false,
      hasUserBookmarked: false
    },
    {
      id: 4,
      title: "Dividend Investing Strategy for 2024",
      content: `With interest rates potentially peaking, dividend stocks might become more attractive. Here's my approach:

💰 High-Yield Targets:
- REITs with strong fundamentals
- Utility stocks with growth potential
- Dividend aristocrats with consistent growth

📊 Screening Criteria:
- Yield: 3-6% range
- Payout ratio: <70%
- 5+ years of dividend growth
- Strong balance sheet

Looking for sustainable income streams. What's your dividend strategy?`,
      author: {
        id: 'user4',
        name: 'Jennifer Park',
        avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
        reputation: 1100,
        badge: 'Income Investor'
      },
      category: 'strategy-sharing',
      tags: ['dividends', 'income', 'REITs', 'utilities'],
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      stats: {
        likes: 27,
        replies: 21,
        views: 445,
        bookmarks: 15
      },
      isPinned: false,
      hasUserLiked: false,
      hasUserBookmarked: true
    },
    {
      id: 5,
      title: "Crypto vs Traditional Assets - Portfolio Allocation",
      content: `Trying to figure out the right crypto allocation in my portfolio. Currently at 5% but considering increasing.

🤔 Considerations:
- Correlation with tech stocks increasing
- Regulatory uncertainty
- Institutional adoption growing
- Volatility still high

What percentage of your portfolio is in crypto? How do you balance risk vs potential returns?`,
      author: {
        id: 'user5',
        name: 'Alex Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        reputation: 420,
        badge: 'New Member'
      },
      category: 'general-discussion',
      tags: ['crypto', 'BTC', 'ETH', 'allocation'],
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      stats: {
        likes: 12,
        replies: 9,
        views: 178,
        bookmarks: 3
      },
      isPinned: false,
      hasUserLiked: false,
      hasUserBookmarked: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Discussions', icon: 'MessageSquare', count: 156 },
    { id: 'general-discussion', name: 'General Discussion', icon: 'Users', count: 45 },
    { id: 'stock-analysis', name: 'Stock Analysis', icon: 'TrendingUp', count: 38 },
    { id: 'market-news', name: 'Market News', icon: 'Newspaper', count: 29 },
    { id: 'strategy-sharing', name: 'Strategy Sharing', icon: 'Target', count: 44 }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent', icon: 'Clock' },
    { id: 'popular', name: 'Most Popular', icon: 'Heart' },
    { id: 'replies', name: 'Most Replied', icon: 'MessageCircle' },
    { id: 'views', name: 'Most Viewed', icon: 'Eye' }
  ];

  useEffect(() => {
    setThreads(mockThreads);
  }, []);

  useEffect(() => {
    let filtered = threads;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(thread => thread.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort threads
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.stats.likes - a.stats.likes);
        break;
      case 'replies':
        filtered.sort((a, b) => b.stats.replies - a.stats.replies);
        break;
      case 'views':
        filtered.sort((a, b) => b.stats.views - a.stats.views);
        break;
      default: // recent
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    // Pinned threads always on top
    const pinned = filtered.filter(thread => thread.isPinned);
    const regular = filtered.filter(thread => !thread.isPinned);
    
    setFilteredThreads([...pinned, ...regular]);
  }, [threads, activeCategory, searchQuery, sortBy]);

  const handleThreadAction = (threadId, action, value) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        switch (action) {
          case 'like':
            return {
              ...thread,
              hasUserLiked: !thread.hasUserLiked,
              stats: {
                ...thread.stats,
                likes: thread.hasUserLiked ? thread.stats.likes - 1 : thread.stats.likes + 1
              }
            };
          case 'bookmark':
            return {
              ...thread,
              hasUserBookmarked: !thread.hasUserBookmarked,
              stats: {
                ...thread.stats,
                bookmarks: thread.hasUserBookmarked ? thread.stats.bookmarks - 1 : thread.stats.bookmarks + 1
              }
            };
          case 'view':
            return {
              ...thread,
              stats: {
                ...thread.stats,
                views: thread.stats.views + 1
              }
            };
          default:
            return thread;
        }
      }
      return thread;
    }));
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-20 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Community Forum
                </h1>
                <p className="text-text-secondary">
                  Share insights, discuss strategies, and learn from fellow investors
                </p>
              </div>
              <button
                onClick={() => setShowCreatePost(true)}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Icon name="Plus" size={20} />
                <span>New Post</span>
              </button>
            </div>

            {/* Forum Categories - Mobile Tabs */}
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide mb-6 lg:hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs bg-surface/50 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type="text"
                  placeholder="Search discussions, stocks, strategies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-card rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass-card px-4 py-3 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id} className="bg-surface">
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar - Desktop */}
            <div className="hidden lg:block">
              <CategorySidebar 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Premium Teaser */}
              {userSubscription === 'free' && (
                <div className="glass-card p-6 rounded-lg mb-6 border border-warning/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-primary/5"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon name="Crown" size={24} className="text-warning" />
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        Unlock Premium Strategies
                      </h3>
                    </div>
                    <p className="text-text-secondary mb-4">
                      Get access to exclusive investment strategies, detailed stock picks, and advanced analysis from top performers.
                    </p>
                    <button
                      onClick={() => navigate('/premium-strategy-hub')}
                      className="bg-gradient-to-r from-warning to-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                </div>
              )}

              {/* Thread List */}
              <div className="space-y-4">
                {filteredThreads.length > 0 ? (
                  filteredThreads.map((thread) => (
                    <ThreadCard
                      key={thread.id}
                      thread={thread}
                      onLike={() => handleThreadAction(thread.id, 'like')}
                      onBookmark={() => handleThreadAction(thread.id, 'bookmark')}
                      onView={() => handleThreadAction(thread.id, 'view')}
                      onClick={() => setSelectedThread(thread)}
                      formatTimeAgo={formatTimeAgo}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No discussions found</h3>
                    <p className="text-text-secondary">
                      {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion!'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trending Topics Sidebar - Desktop */}
            <div className="hidden lg:block">
              <TrendingTopics />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-strong flex items-center justify-center sm:hidden z-50 hover:scale-110 transition-transform"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          categories={categories.filter(c => c.id !== 'all')}
        />
      )}

      {selectedThread && (
        <ThreadDetailModal
          thread={selectedThread}
          onClose={() => setSelectedThread(null)}
          onLike={() => handleThreadAction(selectedThread.id, 'like')}
          onBookmark={() => handleThreadAction(selectedThread.id, 'bookmark')}
          formatTimeAgo={formatTimeAgo}
        />
      )}
    </div>
  );
};

export default CommunityInvestmentForum;