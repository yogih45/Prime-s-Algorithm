// src/components/AlgorithmExplanation.js
import React from 'react';
import '../css/algorithm.css' // Import CSS file for styling

const AlgorithmExplanation = () => {
    return (
        <div className="prim-page">
            <header>
                <h1>Prim's Algorithm</h1>
            </header>
            <section className="main-content">
                <div className="algorithm-explanation">
                    <h2>Introduction to Prim’s algorithm</h2>
                    <p>
                         Like Kruskal’s algorithm, Prim’s
                        algorithm is also a Greedy algorithm. This algorithm always starts with a single node and moves
                        through several adjacent nodes, in order to explore all of the connected edges along the way.
                    </p>
                    <p>
                        The algorithm starts with an empty spanning tree. The idea is to maintain two sets of vertices. The
                        first set contains the vertices already included in the MST, and the other set contains the vertices
                        not yet included. At every step, it considers all the edges that connect the two sets and picks the
                        minimum weight edge from these edges. After picking the edge, it moves the other endpoint of the edge
                        to the set containing MST.
                    </p>
                    <p>
                        A group of edges that connects two sets of vertices in a graph is called cut in graph theory. So, at
                        every step of Prim’s algorithm, find a cut, pick the minimum weight edge from the cut, and include
                        this vertex in MST Set (the set that contains already included vertices).
                    </p>
                    <h2>How does Prim’s Algorithm Work?</h2>
                    <ol>
                        <li>Determine an arbitrary vertex as the starting vertex of the MST.</li>
                        <li>Follow steps 3 to 5 till there are vertices that are not included in the MST (known as fringe vertex).</li>
                        <li>Find edges connecting any tree vertex with the fringe vertices.</li>
                        <li>Find the minimum among these edges.</li>
                        <li>Add the chosen edge to the MST if it does not form any cycle.</li>
                        <li>Return the MST and exit.</li>
                    </ol>
                    <p>
                        Note: For determining a cycle, we can divide the vertices into two sets [one set contains the vertices included in MST and the other contains the fringe vertices.].
                    </p>
                    <h2>How to implement Prim’s Algorithm?</h2>
                    <ol>
                        <li>Create a set <code>mstSet</code> that keeps track of vertices already included in MST.</li>
                        <li>Assign a key value to all vertices in the input graph. Initialize all key values as <code>INFINITE</code>. Assign the key value as 0 for the first vertex so that it is picked first.</li>
                        <li>While <code>mstSet</code> doesn’t include all vertices:
                            <ol type="a">
                                <li>Pick a vertex <code>u</code> that is not there in <code>mstSet</code> and has a minimum key value.</li>
                                <li>Include <code>u</code> in the <code>mstSet</code>.</li>
                                <li>Update the key value of all adjacent vertices of <code>u</code>. To update the key values, iterate through all adjacent vertices.</li>
                                <li>For every adjacent vertex <code>v</code>, if the weight of edge <code>u-v</code> is less than the previous key value of <code>v</code>, update the key value as the weight of <code>u-v</code>.</li>
                            </ol>
                        </li>
                    </ol>
                </div>
                
            </section>
            {/*<div className="additional-content">
                    <h2>Additional Resources</h2>
                   
                    <div className="image-section">
                    
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTMnCM7ARz2SdngVd9QRpU-NURvqsYstUkw&s" alt="Example" />
                    </div>
                    <div className="video-section">
                        <h3>Introduction Video</h3>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/example" title="Introduction Video" frameBorder="0" allowFullScreen></iframe>
                    </div>
            </div> */}
        </div>
    );
};

export default AlgorithmExplanation;
