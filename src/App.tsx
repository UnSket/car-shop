import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import { CarsList } from './screens/CarsList/CarsList';
import { NotFound } from './screens/NotFound/NotFound';
import styles from './App.module.css'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<CarsList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>

  );
}