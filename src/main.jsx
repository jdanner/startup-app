import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './Home';
import Companies from './Companies';
import JobBoard from './JobBoard';
import NonProfits from './NonProfits';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<App />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/nonprofit-portfolio" element={<NonProfits />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 