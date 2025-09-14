// Modern Dark Theme Configuration
// Inspired by clean, minimal AI platform interfaces

export const themeConfig = {
  // Color Palette
  colors: {
    // Near-black backgrounds for dark mode
    background: {
      primary: '#0a0a0a',    // Main background
      secondary: '#141414',   // Card/Panel background
      tertiary: '#1a1a1a',    // Hover states
    },
    
    // Subtle borders
    border: {
      default: '#262626',     // Default border
      hover: '#404040',       // Hover border
      focus: '#525252',       // Focus border
    },
    
    // Text colors
    text: {
      primary: '#fafafa',     // Primary text
      secondary: '#a3a3a3',   // Secondary text
      muted: '#737373',       // Muted text
    },
    
    // Accent colors
    accent: {
      primary: '#ffffff',     // Primary accent (white buttons)
      secondary: '#262626',   // Secondary accent
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',   // Pill shape
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  
  // Component Specific Styles
  components: {
    button: {
      height: {
        sm: '32px',
        md: '36px',
        lg: '44px',
      },
      padding: {
        sm: '0 16px',
        md: '0 20px',
        lg: '0 32px',
      }
    },
    
    input: {
      height: '36px',
      padding: '0 12px',
    },
    
    sidebar: {
      width: {
        collapsed: '64px',
        expanded: '256px',
      }
    }
  }
};

export default themeConfig;