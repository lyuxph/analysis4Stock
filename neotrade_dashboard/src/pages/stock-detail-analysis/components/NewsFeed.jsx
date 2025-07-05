import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NewsFeed = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  // Mock news data
  const mockNews = {
    'AAPL': [
      {
        id: 1,
        title: 'Apple Reports Strong Q4 Earnings, iPhone Sales Exceed Expectations',
        summary: 'Apple Inc. reported quarterly earnings that beat analyst expectations, driven by strong iPhone 15 sales and services revenue growth.',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 1800000),
        category: 'earnings',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=200&fit=crop',
        url: '#'
      },
      {
        id: 2,
        title: 'Apple Vision Pro Production Ramp-Up Signals Strong Demand',
        summary: 'Reports suggest Apple is increasing Vision Pro production capacity as early adopters show strong interest in the mixed reality headset.',
        source: 'TechCrunch',
        publishedAt: new Date(Date.now() - 3600000),
        category: 'product',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=200&fit=crop',
        url: '#'
      },
      {
        id: 3,
        title: 'Analyst Upgrades Apple Stock on AI Integration Prospects',
        summary: 'Morgan Stanley raises Apple price target citing potential AI features in upcoming iOS updates and hardware improvements.',
        source: 'MarketWatch',
        publishedAt: new Date(Date.now() - 7200000),
        category: 'analyst',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
        url: '#'
      },
      {
        id: 4,
        title: 'Apple Faces Regulatory Scrutiny in EU Over App Store Policies',
        summary: 'European regulators are investigating Apple\'s App Store practices under the new Digital Markets Act, potentially impacting revenue.',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 10800000),
        category: 'regulatory',
        sentiment: 'negative',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop',
        url: '#'
      }
    ],
    'TSLA': [
      {
        id: 5,
        title: 'Tesla Delivers Record Number of Vehicles in Q4',
        summary: 'Tesla announced record quarterly deliveries, beating analyst estimates and showing strong demand for Model Y and Model 3.',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 1200000),
        category: 'earnings',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=200&fit=crop',
        url: '#'
      },
      {
        id: 6,
        title: 'Musk Announces New Gigafactory Location in Southeast Asia',
        summary: 'Tesla CEO Elon Musk revealed plans for a new manufacturing facility to serve the growing Asian market demand.',
        source: 'CNBC',
        publishedAt: new Date(Date.now() - 5400000),
        category: 'expansion',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
        url: '#'
      }
    ],
    'GOOGL': [
      {
        id: 7,
        title: 'Google Cloud Revenue Surges 35% Year-over-Year',
        summary: 'Alphabet\'s cloud division continues strong growth trajectory, competing effectively with AWS and Microsoft Azure.',
        source: 'Wall Street Journal',
        publishedAt: new Date(Date.now() - 2700000),
        category: 'earnings',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop',
        url: '#'
      }
    ]
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews[symbol] || []);
      setLoading(false);
    }, 500);
  }, [symbol]);

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

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const filteredNews = filter === 'all' ? news : news.filter(item => item.category === filter);
  const categories = ['all', 'earnings', 'analyst', 'product', 'regulatory', 'expansion'];

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Market News
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 mb-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              filter === category
                ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-text-secondary">Loading news...</span>
            </div>
          </div>
        ) : filteredNews.length > 0 ? (
          filteredNews.map((article) => (
            <div key={article.id} className="bg-surface/30 rounded-lg p-4 hover:bg-surface/50 transition-colors cursor-pointer">
              <div className="flex space-x-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-text-primary line-clamp-2 leading-tight">
                      {article.title}
                    </h4>
                    <Icon 
                      name={getSentimentIcon(article.sentiment)} 
                      size={14} 
                      className={`${getSentimentColor(article.sentiment)} ml-2 flex-shrink-0`} 
                    />
                  </div>
                  
                  <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-text-primary">
                        {article.source}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        article.category === 'earnings' ? 'bg-success/20 text-success' :
                        article.category === 'analyst' ? 'bg-primary/20 text-primary' :
                        article.category === 'regulatory'? 'bg-error/20 text-error' : 'bg-surface text-text-secondary'
                      }`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Newspaper" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-text-secondary">No news available for this filter</p>
          </div>
        )}
      </div>

      {/* News Summary */}
      <div className="mt-4 pt-4 border-t border-glass-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-text-secondary">Today</div>
            <div className="text-sm font-medium text-text-primary">
              {news.filter(n => new Date(n.publishedAt).toDateString() === new Date().toDateString()).length}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">Positive</div>
            <div className="text-sm font-medium text-success">
              {news.filter(n => n.sentiment === 'positive').length}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">Negative</div>
            <div className="text-sm font-medium text-error">
              {news.filter(n => n.sentiment === 'negative').length}
            </div>
          </div>
        </div>
      </div>

      {/* View More */}
      <div className="mt-4">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors">
          View All News for {symbol}
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;