import React, { useState, useEffect } from 'react';
import '../css/quiz.css';

const allQuestions = [
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
        question: '3. Which of the following are true about Prim’s algorithm? (You can select multiple options)',
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
    {
        question: '11. What is the main purpose of Prim’s algorithm?',
        options: ['A. Find the shortest path', 'B. Find a Minimum Spanning Tree', 'C. Find the maximum flow', 'D. Find the shortest path in a weighted graph'],
        answer: 'B. Find a Minimum Spanning Tree',
    },
    {
        question: '12. What does the “key” value in Prim’s algorithm represent?',
        options: ['A. The weight of the edge', 'B. The index of the vertex', 'C. The distance to the vertex', 'D. The parent vertex'],
        answer: 'C. The distance to the vertex',
    },
    {
        question: '13. How does Prim’s algorithm handle cycles in the graph?',
        options: ['A. It removes them', 'B. It ignores them', 'C. It includes them in the MST', 'D. It uses them to speed up the algorithm'],
        answer: 'B. It ignores them',
    },
    {
        question: '14. What is the function of the “visited” set in Prim’s algorithm?',
        options: ['A. To track included vertices', 'B. To track excluded vertices', 'C. To track all edges', 'D. To track the MST edges'],
        answer: 'A. To track included vertices',
    },
    {
        question: '15. How are the vertices prioritized in Prim’s algorithm?',
        options: ['A. By their degree', 'B. By their key values', 'C. By their index', 'D. By their weight'],
        answer: 'B. By their key values',
    },
    {
        question: '16. What happens if the graph is disconnected in Prim’s algorithm?',
        options: ['A. The algorithm fails', 'B. It returns multiple MSTs', 'C. It returns an MST for each connected component', 'D. It returns an error'],
        answer: 'C. It returns an MST for each connected component',
    },
    {
        question: '17. What is the primary advantage of using Prim’s algorithm over Kruskal’s algorithm?',
        options: ['A. It is faster for sparse graphs', 'B. It is simpler to implement', 'C. It is more memory efficient', 'D. It handles negative weights better'],
        answer: 'A. It is faster for sparse graphs',
    },
    {
        question: '18. What kind of data structure is typically used to implement Prim’s algorithm efficiently?',
        options: ['A. Linked List', 'B. Hash Map', 'C. Priority Queue', 'D. Stack'],
        answer: 'C. Priority Queue',
    },
    {
        question: '19. What is the role of the “parent” array in Prim’s algorithm?',
        options: ['A. To store the parent node for each vertex', 'B. To store the edges in the MST', 'C. To store the weights of edges', 'D. To store visited vertices'],
        answer: 'A. To store the parent node for each vertex',
    },
    {
        question: '20. How does Prim’s algorithm ensure that it always finds a Minimum Spanning Tree?',
        options: ['A. By always picking the edge with the smallest weight', 'B. By always including all edges', 'C. By randomly selecting edges', 'D. By checking all possible MSTs'],
        answer: 'A. By always picking the edge with the smallest weight',
    },
    {
        question: '21. What does the term “greedy algorithm” refer to in the context of Prim’s algorithm?',
        options: ['A. It makes optimal choices at each step', 'B. It tries to maximize the total weight', 'C. It uses a greedy approach to minimize weights', 'D. It explores all possible choices'],
        answer: 'A. It makes optimal choices at each step',
    },
    {
        question: '22. What happens if two edges have the same weight in Prim’s algorithm?',
        options: ['A. Both edges are considered', 'B. One edge is randomly chosen', 'C. The algorithm will not work', 'D. Both edges are ignored'],
        answer: 'B. One edge is randomly chosen',
    },
    {
        question: '23. What is the role of the “key” array in Prim’s algorithm?',
        options: ['A. It tracks the shortest distance to each vertex', 'B. It tracks the edge weights', 'C. It stores the parent nodes', 'D. It stores the visited nodes'],
        answer: 'A. It tracks the shortest distance to each vertex',
    },
    {
        question: '24. What is the main difference between Prim’s algorithm and Dijkstra’s algorithm?',
        options: ['A. Prim’s algorithm is for Minimum Spanning Trees, while Dijkstra’s is for shortest paths', 'B. Dijkstra’s algorithm handles cycles, while Prim’s does not', 'C. Prim’s algorithm is faster', 'D. Dijkstra’s algorithm finds the MST'],
        answer: 'A. Prim’s algorithm is for Minimum Spanning Trees, while Dijkstra’s is for shortest paths',
    },
    {
        question: '25. What happens when the “visited” set includes all vertices in Prim’s algorithm?',
        options: ['A. The algorithm stops', 'B. The algorithm continues to process', 'C. The MST is incomplete', 'D. An error occurs'],
        answer: 'A. The algorithm stops',
    },
    {
        question: '26. How does Prim’s algorithm handle multiple edges between two vertices?',
        options: ['A. It picks the edge with the smallest weight', 'B. It ignores all but one edge', 'C. It includes all edges', 'D. It randomly selects one edge'],
        answer: 'A. It picks the edge with the smallest weight',
    },
    {
        question: '27. How does Prim’s algorithm update the key values of vertices?',
        options: ['A. By recalculating distances', 'B. By checking all edges', 'C. By comparing with the new edge weights', 'D. By incrementing the values'],
        answer: 'C. By comparing with the new edge weights',
    },
    {
        question: '28. What is the “mstSet” in Prim’s algorithm?',
        options: ['A. A set of vertices included in the MST', 'B. A set of edges in the MST', 'C. A set of key values', 'D. A set of all vertices'],
        answer: 'A. A set of vertices included in the MST',
    },
    {
        question: '29. What does the term “Minimum Spanning Tree” refer to?',
        options: ['A. A tree that spans all vertices with minimum total edge weight', 'B. A tree with the maximum number of edges', 'C. A tree with the minimum number of vertices', 'D. A spanning tree with the maximum total weight'],
        answer: 'A. A tree that spans all vertices with minimum total edge weight',
    },
    {
        question: '30. What type of edge does Prim’s algorithm select to add to the MST?',
        options: ['A. The edge with the maximum weight', 'B. The edge with the smallest weight connecting to an unvisited vertex', 'C. The edge with the smallest weight overall', 'D. The edge that connects all vertices'],
        answer: 'B. The edge with the smallest weight connecting to an unvisited vertex',
    },
    {
        question: '31. What is the “priority queue” used for in Prim’s algorithm?',
        options: ['A. To manage the vertices and edges efficiently', 'B. To store the visited vertices', 'C. To track the parent nodes', 'D. To manage the key values'],
        answer: 'A. To manage the vertices and edges efficiently',
    },
    {
        question: '32. What is the role of the “visited” array in Prim’s algorithm?',
        options: ['A. To mark which vertices have been added to the MST', 'B. To store the edges in the MST', 'C. To store the key values', 'D. To track the shortest paths'],
        answer: 'A. To mark which vertices have been added to the MST',
    },
    {
        question: '33. What does the “weight” of an edge represent in Prim’s algorithm?',
        options: ['A. The cost to traverse the edge', 'B. The degree of the vertex', 'C. The number of vertices', 'D. The distance to the vertex'],
        answer: 'A. The cost to traverse the edge',
    },
    {
        question: '34. How does Prim’s algorithm guarantee that the MST is minimum?',
        options: ['A. By always selecting the edge with the smallest weight', 'B. By evaluating all possible MSTs', 'C. By ignoring edges with higher weights', 'D. By using a heuristic'],
        answer: 'A. By always selecting the edge with the smallest weight',
    },
    {
        question: '35. What happens if there are multiple MSTs for a given graph in Prim’s algorithm?',
        options: ['A. Any MST will be valid', 'B. The algorithm will not work', 'C. Only one MST can be selected', 'D. The algorithm will return an error'],
        answer: 'A. Any MST will be valid',
    },
    {
        question: '36. What is the significance of the “parent” array in Prim’s algorithm?',
        options: ['A. It helps in constructing the MST by storing the parent nodes', 'B. It stores the distances from the source vertex', 'C. It tracks the visited vertices', 'D. It stores the weights of edges'],
        answer: 'A. It helps in constructing the MST by storing the parent nodes',
    },
    {
        question: '37. What is the advantage of using an adjacency list over an adjacency matrix in Prim’s algorithm?',
        options: ['A. It reduces space complexity', 'B. It increases time complexity', 'C. It is more suitable for dense graphs', 'D. It is simpler to implement'],
        answer: 'A. It reduces space complexity',
    },
    {
        question: '38. What happens to the “key” value of a vertex if a better edge is found?',
        options: ['A. It is updated with the new weight', 'B. It remains unchanged', 'C. It is removed from the priority queue', 'D. It is set to zero'],
        answer: 'A. It is updated with the new weight',
    },
    {
        question: '39. How does Prim’s algorithm handle graphs with negative edge weights?',
        options: ['A. It can handle negative weights', 'B. It cannot handle negative weights', 'C. It converts negative weights to positive', 'D. It removes negative edges'],
        answer: 'A. It can handle negative weights',
    },
    {
        question: '40. What is the role of the “key” values in the priority queue?',
        options: ['A. To determine the next vertex to process', 'B. To store the minimum weight edges', 'C. To keep track of visited vertices', 'D. To store the edge weights'],
        answer: 'A. To determine the next vertex to process',
    },
    {
        question: '41. How does Prim’s algorithm ensure that no cycles are formed in the MST?',
        options: ['A. By adding edges only if they connect to an unvisited vertex', 'B. By removing cycles from the graph', 'C. By checking for cycles in each step', 'D. By using depth-first search'],
        answer: 'A. By adding edges only if they connect to an unvisited vertex',
    },
    {
        question: '42. What type of graph is required for Prim’s algorithm to work correctly?',
        options: ['A. Undirected and connected graph', 'B. Directed graph', 'C. Weighted graph', 'D. Unweighted graph'],
        answer: 'A. Undirected and connected graph',
    },
    {
        question: '43. What is the purpose of the “mstSet” in Prim’s algorithm?',
        options: ['A. To keep track of vertices included in the MST', 'B. To track the weight of edges', 'C. To manage the priority queue', 'D. To store the shortest paths'],
        answer: 'A. To keep track of vertices included in the MST',
    },
    {
        question: '44. How does Prim’s algorithm select the next edge to add to the MST?',
        options: ['A. By selecting the edge with the smallest weight connecting to an unvisited vertex', 'B. By selecting any edge randomly', 'C. By selecting the edge with the maximum weight', 'D. By selecting the edge that forms a cycle'],
        answer: 'A. By selecting the edge with the smallest weight connecting to an unvisited vertex',
    },
    {
        question: '45. What is the main advantage of Prim’s algorithm over other algorithms like Kruskal’s?',
        options: ['A. It is more efficient for sparse graphs', 'B. It handles negative edge weights better', 'C. It is easier to implement', 'D. It guarantees a minimum spanning tree'],
        answer: 'A. It is more efficient for sparse graphs',
    },
    {
        question: '46. How does the “visited” array affect the execution of Prim’s algorithm?',
        options: ['A. It prevents the algorithm from revisiting vertices', 'B. It stores the key values', 'C. It keeps track of the shortest path', 'D. It stores the parent nodes'],
        answer: 'A. It prevents the algorithm from revisiting vertices',
    },
    {
        question: '47. What is the purpose of the “parent” array in Prim’s algorithm?',
        options: ['A. To help in reconstructing the MST', 'B. To store the distances from the source vertex', 'C. To manage the priority queue', 'D. To keep track of visited vertices'],
        answer: 'A. To help in reconstructing the MST',
    },
    {
        question: '48. What happens to the “key” values in Prim’s algorithm as the algorithm progresses?',
        options: ['A. They are updated to reflect the minimum edge weight', 'B. They remain constant', 'C. They are removed from the graph', 'D. They are reset to zero'],
        answer: 'A. They are updated to reflect the minimum edge weight',
    },
    {
        question: '49. What is the primary goal of the “priority queue” in Prim’s algorithm?',
        options: ['A. To efficiently manage the selection of the next edge', 'B. To store all vertices', 'C. To keep track of visited nodes', 'D. To store the MST edges'],
        answer: 'A. To efficiently manage the selection of the next edge',
    },
    {
        question: '50. How does Prim’s algorithm handle vertices that are not yet in the MST?',
        options: ['A. It updates their key values based on the minimum weight edge', 'B. It ignores them', 'C. It includes them in the MST immediately', 'D. It removes them from the graph'],
        answer: 'A. It updates their key values based on the minimum weight edge',
    }
];


const getRandomQuestions = (questions, num) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [certificate, setCertificate] = useState('');

    useEffect(() => {
        const randomQuestions = getRandomQuestions(allQuestions, 10);
        setQuestions(randomQuestions);
    }, []);

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
                    <h3>Congradulations...</h3>
                    <h3>Your Score: {calculateScore()} / {questions.length}</h3>
                </div>
            ) : (
                <div className="question-section">
                    <h3>{questions[currentQuestion]?.question}</h3>
                    <div className="options">
                        {questions[currentQuestion]?.options.map((option) => (
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
