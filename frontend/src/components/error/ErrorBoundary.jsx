import * as React from 'react';

function   logErrorToMyService(error, componentStack) {
     
    // Catch errors in the lifecycle methods of their children components.
    // A JavaScript error in a part of the UI shouldn't break the whole app.
    // To do this, add a special method to your class component,
    // called componentDidCatch(error, info).
    // error: The error that was thrown.
    // info: An object with a componentStack key containing the component stack
    // during the render where the error occurred.


    console.error('Error:', error);
    console.error('Component Stack:', componentStack);

  }


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }



  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToMyService(
      error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      info.componentStack,
      // Warning: `captureOwnerStack` is not available in production.
      React.captureOwnerStack(),
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;