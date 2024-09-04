import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const PrimVisualization = ({ showAnimation }) => {
  const [numVertices, setNumVertices] = useState(6);
  const [vertexNames, setVertexNames] = useState(['A', 'B', 'C', 'D', 'E','F']);
  const [adjMatrix, setAdjMatrix] = useState([
    [0, 1, 3, 0, 0, 3 ],
    [1, 0, 5, 1, 0, 0 ],
    [3, 5, 0, 2, 1, 0 ],
    [0, 1, 2, 0, 4, 0 ],
    [0, 0, 1, 4, 0, 5 ],
    [0, 0, 0, 0, 5, 0 ]
  ]);
  const [error, setError] = useState('');
  const [mstEdges, setMstEdges] = useState([]);
  const [visited, setVisited] = useState(new Array(5).fill(false));
  const [nodes, setNodes] = useState([]);
  const [speed, setSpeed] = useState(1000);
  const [startVertex, setStartVertex] = useState(0);
  const [mstTotalCost, setMstTotalCost] = useState(0);
  const [log, setLog] = useState([]);

  const svgRef = React.useRef(null);
  const width = 600;
  const height = 600;

  useEffect(() => {
    if (showAnimation) {
      visualizeGraph();
    }
  }, [adjMatrix, mstEdges, visited, showAnimation]);

  useEffect(() => {
    calculateMstCost();
  }, [mstEdges]);

  const visualizeGraph = () => {
    const svg = d3.select('#graph-svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll("*").remove();

    const radius = 250;
    const centerX = width / 2;
    const centerY = height / 2;

    const angleStep = (2 * Math.PI) / numVertices;
    const nodes = vertexNames.map((name, index) => ({
      id: index,
      label: name,
      x: centerX + radius * Math.cos(index * angleStep),
      y: centerY + radius * Math.sin(index * angleStep)
    }));

    setNodes(nodes);

    const links = [];
    adjMatrix.forEach((row, i) => {
      row.forEach((weight, j) => {
        if (weight !== 0 && i < j) {
          links.push({ source: i, target: j, weight });
        }
      });
    });

    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('g')
      .attr('class', 'link');

    link.append('line')
      .style('stroke', 'yellow')
      .style('stroke-width', d => Math.sqrt(d.weight))
      .attr('x1', d => nodes[d.source].x)
      .attr('y1', d => nodes[d.source].y)
      .attr('x2', d => nodes[d.target].x)
      .attr('y2', d => nodes[d.target].y);

    link.append('text')
      .attr('x', d => (nodes[d.source].x + nodes[d.target].x) / 2)
      .attr('y', d => (nodes[d.source].y + nodes[d.target].y) / 2)
      .text(d => d.weight)
      .style('fill', 'white')
      .style("font-weight", "bold")
      .style("font-size", "25px")
      .style('font-family', 'Arial, sans-serif');

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node');

    node.append('circle')
      .attr('r', 30)
      .style('fill', d => visited[d.id] ? 'red' : 'green')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .style('stroke', 'white')
      .style('stroke-width', 1)
      .style('filter', 'url(#drop-shadow)');

    node.append('text')
      .attr('dx', d => d.x - 10)
      .attr('dy', d => d.y + 5)
      .text(d => d.label)
      .style('fill', 'black')
      .style("font-weight", "bold")
      .style("font-size", "30px")
      .style('font-family', 'Arial');

    const mstLink = svg.selectAll('.mst-link')
      .data(mstEdges)
      .enter().append('g')
      .attr('class', 'mst-link');

    mstLink.append('line')
      .style('stroke', 'red')
      .style('stroke-width', 2)
      .attr('x1', d => nodes[d.source].x)
      .attr('y1', d => nodes[d.source].y)
      .attr('x2', d => nodes[d.target].x)
      .attr('y2', d => nodes[d.target].y);

    mstLink.append('text')
      .attr('x', d => (nodes[d.source].x + nodes[d.target].x) / 2)
      .attr('y', d => (nodes[d.source].y + nodes[d.target].y) / 2)
      .text(d => d.weight)
      .style('fill', 'white')
      .style("font-weight", "bold")
      .style("font-size", "20px")
      .style('font-family', 'Arial, sans-serif');

    return links; // Return links for use in asyncPrimAlgorithm
  };
  const handleMatrixSubmit = (event) => {
    event.preventDefault();
    const matrixText = event.target.matrix.value;
    const newMatrix = matrixText.split('\n').map(row => row.trim().split(/\s+/).map(Number));
  
    // Check for non-numeric characters and negative numbers
    const containsInvalid = newMatrix.some(row => 
      row.some(value => isNaN(value) || value < 0)
    );
  
    if (containsInvalid) {
      alert('Adjacency matrix must contain only non-negative numbers and alphabets are not allowed');
      return;
    }
  
    // Check if the dimensions match the number of vertices
    if (newMatrix.length !== numVertices || newMatrix.some(row => row.length !== numVertices)) {
      alert('The dimensions of the adjacency matrix must match the number of vertices to be a connected graph.');
      return;
    }
  
    // Check if the graph is connected using BFS
    const isConnected = (matrix) => {
      const visited = new Array(matrix.length).fill(false);
      const queue = [0]; // Start BFS from the first vertex
      visited[0] = true;
  
      while (queue.length > 0) {
        const vertex = queue.shift();
        for (let i = 0; i < matrix.length; i++) {
          if (matrix[vertex][i] !== 0 && !visited[i]) {
            visited[i] = true;
            queue.push(i);
          }
        }
      }
  
      return visited.every(v => v === true);
    };
  
    if (!isConnected(newMatrix)) {
      alert('The graph must be connected. Please check your adjacency matrix.');
      return;
    }
  
    // If the matrix is valid, update the state
    setAdjMatrix(newMatrix);
    setMstEdges([]);
    setVisited(new Array(newMatrix.length).fill(false));
  };
  
  
  

  const handleVerticesSubmit = (event) => {
    event.preventDefault();
    const newNumVertices = parseInt(event.target.numVertices.value);
    const newVertexNames = event.target.vertexNames.value.split(',').map(name => name.trim());
  
    if (newNumVertices !== newVertexNames.length) {
      alert('The number of vertices must match the number of vertex names.');
      return;
    }
  
    setNumVertices(newNumVertices);
    setVertexNames(newVertexNames);
    setAdjMatrix(Array(newNumVertices).fill(0).map(() => Array(newNumVertices).fill(0)));
    setMstEdges([]);
    setVisited(new Array(newNumVertices).fill(false));
  };
  

  const handleStartVertexSubmit = (event) => {
    event.preventDefault();
    const start = vertexNames.indexOf(event.target.startVertex.value.trim());
    if (start >= 0 && start < numVertices) {
      setStartVertex(start);
    } else {
      alert('Invalid starting vertex');
    }
  };

  const runPrimAlgorithm = () => {
    let newMstEdges = [];
    let newVisited = new Array(numVertices).fill(false);
    let mstWeight = 0;

    newVisited[startVertex] = true;

    const updateStateWithDelay = (edges, visitedCopy, message) => {
      setMstEdges([...edges]);
      setVisited([...visitedCopy]);
      setLog(prevLog => [...prevLog, message]);
    };

    const links = visualizeGraph(); // Get links here

    const asyncPrimAlgorithm = async () => {
      while (newMstEdges.length < numVertices - 1) {
        let minWeight = Infinity;
        let minFrom = -1;
        let minTo = -1;

        for (let i = 0; i < numVertices; i++) {
          if (newVisited[i]) {
            for (let j = 0; j < numVertices; j++) {
              if (!newVisited[j] && adjMatrix[i][j] !== 0 && adjMatrix[i][j] < minWeight) {
                minWeight = adjMatrix[i][j];
                minFrom = i;
                minTo = j;
              }
            }
          }
        }

        if (minFrom !== -1 && minTo !== -1) {
          newMstEdges.push({ source: minFrom, target: minTo, weight: minWeight });
          newVisited[minTo] = true;
          mstWeight += minWeight;

          // Generate detailed log message
          const logMessage = `
          <div>
            <strong><span style="color: black;">Iteration ${newMstEdges.length}:</span></strong><br>
            Selected edge: <strong>${vertexNames[minFrom]} - ${vertexNames[minTo]}</strong> with weight <span>${minWeight}</span>.<br>
            Current MST weight: <span>${mstWeight}</span>.<br>
            Visited vertices: <span style="color: white;">${vertexNames.filter((_, idx) => newVisited[idx]).join(', ')}</span>.<br>
            Remaining edges: <span style="color: yellow;">${links.filter(link => !newMstEdges.some(mstEdge => (mstEdge.source === link.source && mstEdge.target === link.target) || (mstEdge.source === link.target && mstEdge.target === link.source))).map(link => `${vertexNames[link.source]}-${vertexNames[link.target]}(${link.weight})`).join(', ')}</span>.
          </div>
        `;


          await updateStateWithDelay(newMstEdges, newVisited, logMessage);
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    };

    asyncPrimAlgorithm();
  };

  const calculateMstCost = () => {
    const totalCost = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
    setMstTotalCost(totalCost);
  };

  const handleOpenNewWindow = () => {
    if (mstEdges.length > 0) {
      const svgContent = `
        <h2 style={backgroundColor:'black', border: 'none' }>Minimum cost Spanning Tree  </h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        
          <!-- Black background -->
          <rect width="90%" height="100%" fill="black" />
          
          
          ${mstEdges.map(edge => `
            <g>
              <line 
                x1="${nodes[edge.source].x}" 
                y1="${nodes[edge.source].y}" 
                x2="${nodes[edge.target].x}" 
                y2="${nodes[edge.target].y}" 
                stroke="red" 
                stroke-width="2" 
              />
              <text 
                x="${(nodes[edge.source].x + nodes[edge.target].x) / 2}" 
                y="${(nodes[edge.source].y + nodes[edge.target].y) / 2}" 
                fill="white"
                style="font-weight: bold; font-size: 20px; font-family: Arial; color:black"
              >${edge.weight}</text>
            </g>
          `).join('')}
          
          ${nodes.map(node => `
            <g>
              <circle
                cx="${node.x}" 
                cy="${node.y}" 
                r="30" 
                fill="green" 
                stroke="white" 
                stroke-width="1" 
              />
              <text
                x="${node.x - 10}" 
                y="${node.y + 5}" 
                fill="white"
                style="font-weight: bold; font-size: 15px; font-family: Arial;"
              >${vertexNames[node.id]}</text>
            </g>
          `).join('')}
        </svg>
      `;
      const svgWindow = window.open('', '_blank','width=600,height=600');
      svgWindow.document.write(svgContent);
      svgWindow.document.close();
    }
  };
  
  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
  };

  const clearCanvas = () => {
    setMstEdges([]);
    setVisited(new Array(numVertices).fill(false));
    setLog([]); // Clear the log as well
  };

  return (
    <Container>
      <Sidebar>
        <SpeedControl>
          <SpeedButton onClick={() => setSpeed(2000)}>0.5x</SpeedButton>
          <SpeedButton onClick={() => setSpeed(1000)}>1x</SpeedButton>
          <SpeedButton onClick={() => setSpeed(500)}>2x</SpeedButton>
        </SpeedControl>
        <RunButton onClick={runPrimAlgorithm}>RUN Prim</RunButton>
        <ClearButton onClick={clearCanvas}>Clear Canvas</ClearButton>
        <ExportButton onClick={handleOpenNewWindow}>Show MST</ExportButton>
        <GraphForm onSubmit={handleVerticesSubmit}>
          <label>Number of vertices:</label>
          <Input type="number" name="numVertices" defaultValue={numVertices} />
          <label>Vertex names:</label>
          <Input style={{ width: '200px', height: '5px', borderRadius: '5px', marginTop: '-10px' }} type="text" name="vertexNames" defaultValue={vertexNames.join(',')} />
          <SubmitButton type="submit">Set Vertices</SubmitButton>
        </GraphForm>
        <MatrixForm onSubmit={handleMatrixSubmit}>
          <label>Adjacency Matrix:</label>
          <textarea name="matrix" rows="5" cols="20" defaultValue={adjMatrix.map(row => row.join(' ')).join('\n')}></textarea>
          <SubmitButton type="submit">Set Matrix</SubmitButton>
        </MatrixForm>
        <StartVertexForm onSubmit={handleStartVertexSubmit}>
          <label>Start Vertex:</label>
          <Input style={{ width: '200px', marginTop: '-10px', height: '5px' }} type="text" name="startVertex" defaultValue={vertexNames[startVertex]} />
          <SubmitButton type="submit">Set Start Vertex</SubmitButton>
        </StartVertexForm>
      </Sidebar>
      <Main>
        <svg id="graph-svg" style={{ marginTop: '-10px', border: 'none' }} ref={svgRef}></svg>
        <LogContainer>
      <Log>
        {log.map((entry, index) => (
          <LogEntry key={index} dangerouslySetInnerHTML={{ __html: entry }} />
        ))}
      </Log>
    </LogContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 150vh;
  width: 100%;
`;

const Sidebar = styled.div`
  width: 600px;
  background: #2f2f2f;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #fff;
`;

const Main = styled.div`
  flex-grow: 1;
  color: #fff;
  text-align: center;
  padding: 20px;
  padding-left: 150px;
  position: relative;
  margin-top: 100px;
  margin-left: 230px;
  width: 1500px;
`;

const SpeedControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SpeedButton = styled.button`
  width: 30%;
  padding: 10px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const RunButton = styled.button`
  width: 200px;
  padding: 10px;
  background: #ff1493;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #ff69b4;
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #1c86ee;
  }
`;

const GraphForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0px;

  label {
    font-size: 14px;
  }
`;

const MatrixForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 14px;
  }
`;

const StartVertexForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 14px;
  }
`;

const Input = styled.input`
  margin-top: -20px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 190px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: #32cd32;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 190px;

  &:hover {
    background: #3cb371;
  }
`;

const ExportButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #ffa500;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #ff8c00;
  }
`;

const LogContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0, 0);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  max-height: 500px;
  overflow-y: auto;
  width: 400px;
  font-size: 15px;
  text-align: left;
`;

const Log = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LogEntry = styled.div`
  padding: 15px;
  background:green;
  border-radius: 7px;
`;

export default PrimVisualization;
