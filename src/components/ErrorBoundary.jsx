import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
          <section className="rounded-lg border border-red-200 bg-white p-6 shadow-lg max-w-md text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <h1 className="text-lg font-bold text-red-700 mb-2">Page Error</h1>
            <p className="text-sm text-slate-600 mb-4">
              An unexpected error occurred while loading this page. Please refresh or contact support.
            </p>
            <details className="text-left text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 max-h-32 overflow-y-auto">
              <summary className="cursor-pointer font-medium text-slate-700 mb-2">Error Details</summary>
              <pre className="whitespace-pre-wrap break-words font-mono">
                {this.state.error?.toString()}
                {'\n\n'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Reload Page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
