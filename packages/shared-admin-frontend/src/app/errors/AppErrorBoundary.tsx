import { Component, ErrorInfo, Fragment } from "react";
import { System } from "#app/services/system";
import { AppErrorNotice } from "./AppErrorNotice";
import { AppErrorHandler } from "./AppErrorHandler";

export class AppErrorBoundary extends Component<{
  children: any;
}> {
  state = {
    error: "",
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      ...this.state,
      error: error.message,
    });

    if (!["Network Error", "Request aborted"].includes(error.message)) {
      System.logError({
        message: error.message,
        path: window.location.pathname,
        stack: error.stack,
      }).catch(console.error);
    }
  }

  render() {
    if (this.state.hasError) {
      return <AppErrorNotice error={this.state.error} />;
    }

    return (
      <Fragment>
        <AppErrorHandler />
        {this.props.children}
      </Fragment>
    );
  }
}
