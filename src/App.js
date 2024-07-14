import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Quiz from './components/quiz';
import Contact from './components/team';
import About from './components/Algorithm';
import Home from './components/home'
import Simulate from './components/simulate'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Dashboard />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/simulate" element={<Simulate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
