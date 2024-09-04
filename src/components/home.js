// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="content">
                <h1>Welcome to Prim's Algorithm Learning Platform</h1>
                <p>
                    Discover the fascinating world of graph algorithms. Learn about Prim's algorithm, understand how it works, and test your knowledge with our interactive quiz.
                </p>
                <div className="button-container">
                    <Link to="/simulate" className="start-button">
                        Get Started    
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
