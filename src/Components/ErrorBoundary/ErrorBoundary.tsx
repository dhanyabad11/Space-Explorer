import { Component, ErrorInfo, ReactNode } from "react";

import Alert from "@mui/material/Alert";
type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error: { error: Error; errorInfo: ErrorInfo } | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ hasError: true, error: { error, errorInfo } });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Alert style={{ fontSize: "1.5rem" }} severity="error">
                    {`Error type: ${this.state.error?.error}`}
                </Alert>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
