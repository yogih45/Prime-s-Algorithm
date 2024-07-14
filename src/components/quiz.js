import React, { useState } from 'react';
import '../css/quiz.css';

const questions = [
    {
        question: '1. What type of algorithm is Prim’s algorithm?',
        options: ['A. Dynamic Programming', 'B. Divide and Conquer', 'C. Greedy', 'D. Backtracking'],
        answer: 'C. Greedy',
    },
    {
        question: '2. What does Prim’s algorithm always start with?',
        options: ['A. An edge', 'B. A single node', 'C. A set of nodes', 'D. A set of edges'],
        answer: 'B. A single node',
    },
    {
        question: '3. Which of the following are true about Prim’s algorithm?       s(You can select multiple options)',
        options: ['A. It is a greedy algorithm', 'B. It starts with a single node', 'C. It can handle negative weights', 'D. It finds a Minimum Spanning Tree'],
        answer: ['A. It is a greedy algorithm', 'B. It starts with a single node', 'D. It finds a Minimum Spanning Tree'],
    },
    {
        question: '4. In Prim’s algorithm, what does the MST stand for?',
        options: ['A. Minimum Spanning Tree', 'B. Maximum Spanning Tree', 'C. Minimum Spanning Term', 'D. Maximum Spanning Term'],
        answer: 'A. Minimum Spanning Tree',
    },
    {
        question: '5. What is the time complexity of Prim’s algorithm using an adjacency matrix?',
        options: ['A. O(V)', 'B. O(V^2)', 'C. O(V log V)', 'D. O(E log V)'],
        answer: 'B. O(V^2)',
    },
    {
        question: '6. Which data structure can improve the time complexity of Prim’s algorithm to O(E log V)?',
        options: ['A. Array', 'B. Queue', 'C. Binary Heap', 'D. Stack'],
        answer: 'C. Binary Heap',
    },
    {
        question: '7. What is the first step in implementing Prim’s algorithm?',
        options: [
            'A. Create a set mstSet',
            'B. Pick the smallest edge',
            'C. Initialize all key values as INFINITE',
            'D. Include the starting vertex in the MST',
        ],
        answer: 'A. Create a set mstSet',
    },
    {
        question: '8. What does Prim’s algorithm use to keep track of the minimum weight edge?',
        options: ['A. mstSet', 'B. Key values', 'C. Adjacency list', 'D. Edges list'],
        answer: 'B. Key values',
    },
    {
        question: '9. What type of graph does Prim’s algorithm operate on?',
        options: ['A. Directed graph', 'B. Undirected graph', 'C. Weighted graph', 'D. Unweighted graph'],
        answer: 'C. Weighted graph',
    },
    {
        question: '10. In Prim’s algorithm, what happens after picking the minimum weight edge?',
        options: [
            'A. Remove the edge from the graph',
            'B. Update the key values of all adjacent vertices',
            'C. Include the edge in mstSet',
            'D. Restart the algorithm',
        ],
        answer: 'B. Update the key values of all adjacent vertices',
    },
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleOptionClick = (option) => {
        const question = questions[currentQuestion];
        const isMultipleAnswer = Array.isArray(question.answer);

        if (isMultipleAnswer) {
            const currentAnswers = selectedAnswers[currentQuestion] || [];
            const updatedAnswers = currentAnswers.includes(option)
                ? currentAnswers.filter((ans) => ans !== option)
                : [...currentAnswers, option];
            setSelectedAnswers((prevAnswers) => ({
                ...prevAnswers,
                [currentQuestion]: updatedAnswers,
            }));
        } else {
            setSelectedAnswers((prevAnswers) => ({
                ...prevAnswers,
                [currentQuestion]: option,
            }));
        }
    };

    const handleNextClick = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = selectedAnswers[index];
            if (Array.isArray(question.answer)) {
                if (selectedAnswer &&
                    selectedAnswer.length === question.answer.length &&
                    selectedAnswer.every((val) => question.answer.includes(val))) {
                    score++;
                }
            } else {
                if (selectedAnswer === question.answer) {
                    score++;
                }
            }
        });
        return score;
    };

    return (
        <div className="quiz">
            <h2>Prim's Algorithm Quiz</h2>
            {showResults ? (
                <div className="results">
                    <h3>Your Score: {calculateScore()} / {questions.length}</h3>
                </div>
            ) : (
                <div className="question-section">
                    <h3>{questions[currentQuestion].question}</h3>
                    <div className="options">
                        {questions[currentQuestion].options.map((option) => (
                            <div
                                key={option}
                                className={`option-label ${
                                    selectedAnswers[currentQuestion] &&
                                    (Array.isArray(selectedAnswers[currentQuestion])
                                        ? selectedAnswers[currentQuestion].includes(option)
                                        : selectedAnswers[currentQuestion] === option)
                                        ? 'selected'
                                        : ''
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <button className="next-button" onClick={handleNextClick}>
                        {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
