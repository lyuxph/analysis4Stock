// src/services/portfolioAnalysisService.js
import openai from './openaiClient';

/**
 * Generates AI-powered portfolio analysis based on user's risk profile and portfolio data
 * @param {Object} portfolioData - User's portfolio holdings and performance
 * @param {Object} userProfile - User's risk tolerance and investment preferences
 * @returns {Promise<Object>} AI analysis with recommendations
 */
export async function generatePortfolioAnalysis(portfolioData, userProfile) {
  try {
    const prompt = `
      As a professional financial advisor and portfolio analyst, provide a comprehensive analysis of the following investment portfolio.
      
      Portfolio Data:
      - Total Value: $${portfolioData.totalValue?.toLocaleString()}
      - Daily P&L: $${portfolioData.dailyPL?.toLocaleString()} (${portfolioData.dailyReturn}%)
      - Total P&L: $${portfolioData.totalPL?.toLocaleString()} (${portfolioData.totalReturn}%)
      
      Holdings:
      ${portfolioData.positions?.map(position => 
        `- ${position.symbol} (${position.companyName}): ${position.shares} shares, Current: $${position.currentPrice}, P&L: $${position.totalPL} (${position.totalReturn}%)`
      ).join('\n')}
      
      User Profile:
      - Risk Tolerance: ${userProfile.riskTolerance}
      - Time Horizon: ${userProfile.timeHorizon}
      - Investment Goals: ${userProfile.investmentGoals?.join(', ')}
      - Trading Style: ${userProfile.tradingStyle}
      - Preferred Sectors: ${userProfile.preferredSectors?.join(', ')}
      - Experience Level: ${userProfile.experienceLevel}
      
      Please provide analysis in the following areas:
      1. Portfolio Diversification Assessment
      2. Risk Analysis based on user's risk tolerance
      3. Performance Evaluation
      4. Sector Allocation Review
      5. Specific Recommendations for improvement
      6. Market Outlook considerations
      7. Action Items (Buy/Sell/Hold recommendations)
      
      Format your response as a comprehensive but concise professional report.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional financial advisor with expertise in portfolio analysis, risk management, and investment strategies. Provide actionable insights based on modern portfolio theory and current market conditions.' },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'portfolio_analysis_response',
          schema: {
            type: 'object',
            properties: {
              overall_score: { type: 'number' },
              diversification_score: { type: 'number' },
              risk_alignment_score: { type: 'number' },
              performance_summary: { type: 'string' },
              diversification_analysis: { type: 'string' },
              risk_analysis: { type: 'string' },
              sector_allocation: { type: 'string' },
              recommendations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    symbol: { type: 'string' },
                    action: { type: 'string' },
                    reason: { type: 'string' },
                    priority: { type: 'string' }
                  },
                  required: ['type', 'action', 'reason', 'priority'],
                  additionalProperties: false
                }
              },
              market_outlook: { type: 'string' },
              key_risks: {
                type: 'array',
                items: { type: 'string' }
              },
              next_steps: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            required: ['overall_score', 'diversification_score', 'risk_alignment_score', 'performance_summary', 'diversification_analysis', 'risk_analysis', 'recommendations', 'market_outlook', 'key_risks', 'next_steps'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.7,
      max_tokens: 2000
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating portfolio analysis:', error);
    throw new Error('Failed to generate portfolio analysis. Please try again later.');
  }
}

/**
 * Gets market sentiment analysis for specific sectors
 * @param {Array} sectors - Array of sector names
 * @returns {Promise<Object>} Market sentiment analysis
 */
export async function getMarketSentimentAnalysis(sectors) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a market analyst specializing in sector analysis and market sentiment. Provide current market outlook and sentiment for given sectors.' 
        },
        { 
          role: 'user', 
          content: `Provide current market sentiment analysis for these sectors: ${sectors.join(', ')}. Include outlook, risks, and opportunities for each sector.` 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'market_sentiment_response',
          schema: {
            type: 'object',
            properties: {
              overall_market_sentiment: { type: 'string' },
              sector_analysis: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    sector: { type: 'string' },
                    sentiment: { type: 'string' },
                    outlook: { type: 'string' },
                    key_drivers: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    risks: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    opportunities: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['sector', 'sentiment', 'outlook', 'key_drivers', 'risks', 'opportunities'],
                  additionalProperties: false
                }
              }
            },
            required: ['overall_market_sentiment', 'sector_analysis'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.6,
      max_tokens: 1500
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error getting market sentiment:', error);
    throw new Error('Failed to get market sentiment analysis.');
  }
}