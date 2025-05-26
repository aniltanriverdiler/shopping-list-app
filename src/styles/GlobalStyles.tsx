import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f8fafc;
    line-height: 1.6;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
  }

  /* Bootstrap overrides */
  .table-responsive {
    border-radius: 12px;
    overflow: hidden;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25);
  }

  /* Loading animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-20px,0);
    }
    70% {
      transform: translate3d(0,-10px,0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }

  /* Animation classes */
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-slide-in {
    animation: slideIn 0.5s ease-out;
  }

  .animate-bounce {
    animation: bounce 1s ease-in-out;
  }

  /* Responsive font sizes */
  @media (max-width: 576px) {
    html {
      font-size: 14px;
    }
  }

  @media (min-width: 577px) and (max-width: 768px) {
    html {
      font-size: 15px;
    }
  }

  @media (min-width: 769px) {
    html {
      font-size: 16px;
    }
  }

  /* Focus states for accessibility */
  button:focus,
  input:focus,
  select:focus {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor !important;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Print styles */
  @media print {
    body {
      background: white !important;
    }
    
    button {
      display: none !important;
    }
  }
`;

export default GlobalStyles;