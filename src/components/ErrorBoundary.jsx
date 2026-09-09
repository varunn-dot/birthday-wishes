import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080014] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-6 rounded-3xl bg-pink-950/40 border border-pink-500/30 backdrop-blur-md space-y-4">
            <div className="text-4xl">✨ 💕 🎂</div>
            <h1 className="text-2xl font-bold text-pink-400 font-dancing">Happy Birthday Ramya!</h1>
            <p className="text-sm text-pink-200/80">
              Something went wrong loading a component, but your special day is still magical!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
            >
              Refresh Page ✨
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
