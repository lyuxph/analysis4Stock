/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#0066FF', // Electric blue (primary) - blue-600
        'secondary': '#8B5CF6', // Violet accent (secondary) - violet-500
        'accent': '#10B981', // Mint green (accent) - emerald-500
        
        // Background Colors
        'background': '#0E1117', // Deep charcoal (background) - slate-900
        'surface': '#1C2128', // Elevated surface (surface) - slate-800
        
        // Text Colors
        'text-primary': '#F8FAFC', // Near-white (text-primary) - slate-50
        'text-secondary': '#94A3B8', // Muted slate (text-secondary) - slate-400
        
        // Status Colors
        'success': '#22C55E', // Standard green (success) - green-500
        'warning': '#F59E0B', // Amber (warning) - amber-500
        'error': '#EF4444', // Clear red (error) - red-500
        
        // Glassmorphism
        'glass': 'rgba(28, 33, 40, 0.8)', // Semi-transparent surface - slate-800/80
        'glass-border': 'rgba(255, 255, 255, 0.1)', // Subtle border - white/10
        
        // Border
        'border': 'rgba(255, 255, 255, 0.1)', // Minimal border - white/10
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'], // Modern geometric sans-serif - Inter
        'body': ['Inter', 'system-ui', 'sans-serif'], // Consistent body text - Inter
        'caption': ['Inter', 'system-ui', 'sans-serif'], // Unified caption text - Inter
        'data': ['JetBrains Mono', 'Courier New', 'monospace'], // Monospace for financial data - JetBrains Mono
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      backdropBlur: {
        'glass': '12px',
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '500': '500',
        '1000': '1000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}