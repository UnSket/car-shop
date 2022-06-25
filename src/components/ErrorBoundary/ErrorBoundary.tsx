import React from 'react';
import styles from './ErrorBoundary.module.css';
import { Button, Typography } from '@mui/material';

interface ErrorBoundaryState {
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = { error: null };
    }

    componentDidCatch(error: Error) {
        this.setState({
            error,
        });
    }

    resetError() {
        this.setState({ error: null });
    }

    render() {
        if (this.state.error === null) {
            return this.props.children;
        }

        return (
            <div className={styles.container}>
                <Typography variant="h3" color="error">
                    Ooops, something went wrong!
                </Typography>
                <Typography variant="h4" mt={1.5} mb={2}>
                    Please try again or check back later
                </Typography>
                <Button onClick={this.resetError} variant="contained">
                    Try again
                </Button>
            </div>
        );
    }
}
