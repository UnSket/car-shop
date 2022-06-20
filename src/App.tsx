import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import { CarsList } from './screens/CarsList/CarsList';
import { NotFound } from './screens/NotFound/NotFound';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CarsList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;