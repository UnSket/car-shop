import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarsList } from './screens/CarsList/CarsList';
import { NotFound } from './screens/NotFound/NotFound';
import styles from './App.module.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CarInfo } from './screens/CarInfo/CarInfo';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

export const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className={styles.container}>
                    <Header />
                    <div className={styles.content}>
                        <ErrorBoundary>
                            <Routes>
                                <Route path="/" element={<CarsList />} />
                                <Route
                                    path="/car/:stockNumber"
                                    element={<CarInfo />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </ErrorBoundary>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
