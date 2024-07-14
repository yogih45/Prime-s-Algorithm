import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { Controller } from 'react-spring';

const PrimVisualization = ({ showAnimation }) => {
  const [numVertices, setNumVertices] = useState(8);
  const [vertexNames, setVertexNames] = useState(['A', 'B', 'C', 'D', 'E','F','G','H']);
  const [adjMatrix, setAdjMatrix] = useState([
    [0, 2, 0, 6, 0, 9, 5, 0],
    [2, 0, 3, 8, 5, 2, 3, 3],
    [0, 3, 0, 0, 7, 4, 5, 6],
    [6, 8, 0, 0, 9, 2, 5, 0],
    [0, 5, 7, 9, 0, 0, 5, 1],
    [2, 6, 0, 8, 0, 3, 4, 0],
    [7, 9, 3, 0, 8, 1, 2, 3],
    [0, 7, 0, 8, 3, 0, 5, 0]
  ]);
  const [mstEdges, setMstEdges] = useState([]);
  const [visited, setVisited] = useState(new Array(5).fill(false));
  const [speed, setSpeed] = useState(1000);
  const [startVertex, setStartVertex] = useState(0);
  const [mstTotalCost, setMstTotalCost] = useState(0); 

  const svgRef = React.useRef(null);
  const width = 600;
  const height = 600;

  useEffect(() => {
    if (showAnimation) {
      visualizeGraph();
    }
  }, [adjMatrix, mstEdges, visited, showAnimation]);

  useEffect(() => {
    calculateMstCost(); // Calculate MST cost whenever mstEdges changes
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
      .style('stroke', 'blue')
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
      .style('fill', d => visited[d.id] ? 'green' : 'pink')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .style('stroke', 'voilet') // Border color
      .style('stroke-width', 10)
      .style('filter', 'url(#drop-shadow)'); // Border width

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
      .enter().append('line')
      .attr('class', 'mst-link')
      .style('stroke', 'red')
      .style('stroke-width', 2);

    mstLink.attr('x1', d => nodes[d.source].x)
      .attr('y1', d => nodes[d.source].y)
      .attr('x2', d => nodes[d.target].x)
      .attr('y2', d => nodes[d.target].y);
  };

  const handleMatrixSubmit = (event) => {
    event.preventDefault();
    const matrixText = event.target.matrix.value;
    const newMatrix = matrixText.split('\n').map(row => row.trim().split(/\s+/).map(Number));
    setAdjMatrix(newMatrix);
    setNumVertices(newMatrix.length);
    setMstEdges([]);
    setVisited(new Array(newMatrix.length).fill(false));
  };

  const handleVerticesSubmit = (event) => {
    event.preventDefault();
    const newNumVertices = parseInt(event.target.numVertices.value);
    const newVertexNames = event.target.vertexNames.value.split(',').map(name => name.trim());
    setNumVertices(newNumVertices);
    setVertexNames(newVertexNames);
    setAdjMatrix(Array(newNumVertices).fill(0).map(() => Array(newNumVertices).fill(0)));
    setMstEdges([]);
    setVisited(new Array(newNumVertices).fill(false));
  };

  const handleStartVertexSubmit = (event) => {
    event.preventDefault();
    const start = parseInt(event.target.startVertex.value);
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

    const updateStateWithDelay = (edges, visitedCopy) => {
      setMstEdges([...edges]);
      setVisited([...visitedCopy]);
    };

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

          updateStateWithDelay(newMstEdges, newVisited);
          await sleep(speed);
        }
      }
    };

    asyncPrimAlgorithm();
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const calculateMstCost = () => {
    let totalCost = 0;
    mstEdges.forEach(edge => {
      totalCost += edge.weight;
    });
    setMstTotalCost(totalCost);
  };

  return (
    <div>
      <ControlPanel>
        <ControlSection>
          <SpeedControl>
            <h3 style={{ fontFamily: 'Arial' }}>Set Speed</h3>

            <Button
              gradient="linear-gradient(to right, #0056b3, #0099ff)"

              onClick={() => setSpeed(500)}
            >
              0.5x
            </Button>
            <Button
              gradient="linear-gradient(to right, #00cc66, #33ccff)"

              onClick={() => setSpeed(1000)}
            >
              1x
            </Button>
            <Button
              gradient="linear-gradient(to right, #ff6600, #ffcc00)"

              onClick={() => setSpeed(2000)}
            >
              2x
            </Button>
          </SpeedControl>

          <Button
            gradient="linear-gradient(to right, #b300b3, #ff0066)"
            width="250px"
            height="45px"
            marginTop="100px"
            onClick={runPrimAlgorithm}
          >
            RUN Prim
          </Button>
        </ControlSection>
        <Button
          gradient="linear-gradient(to right, #993366, #00ccff)"
          width="290px"
          height="50px"
          marginLeft="10px" // Use marginLeft here
          onClick={() =>
            setAdjMatrix(Array(numVertices).fill(0).map(() => Array(numVertices).fill(0)))
          }
        >
          Clear Canvas
        </Button>


        {mstEdges.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'Arial', color: 'white' }}>MST Total Cost: {mstTotalCost}</h3>
          </div>
        )}
        <div className='Form-input'>
          <form onSubmit={handleVerticesSubmit}>
            <h3 style={{ fontFamily: 'Arial', color: 'white' }}>Create Graph</h3>
            <input type="number" name="numVertices" defaultValue={numVertices} placeholder='Enter the Number of Vertices' />
            <input type="text" name="vertexNames" defaultValue={vertexNames.join(',')} placeholder='Enter the Name of Vertices' />

            <button className='btn1' type="submit">Set Vertices</button>
          </form>
          <form onSubmit={handleMatrixSubmit}>
            <h3 style={{ fontFamily: 'Arial', color: 'white' }}>
              Adjacency Matrix </h3>
            <textarea name="matrix" rows="10" cols="30" defaultValue={adjMatrix.map(row => row.join(' ')).join('\n')} />
        
            <button className='btn2' type="submit">Create Graph</button>
          </form>
          <form onSubmit={handleStartVertexSubmit}>

          </form>
        </div>

      </ControlPanel>

    </div>
  );
};

const SpeedControl = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  color: white;
  box-shadow: 0px 0px 4px 0px gray ;
  border-radius: 10px;

  width:auto;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const ControlSection = styled.div`
   margin-bottom: 20px;
   border: 0px solid pink;
   padding:20px;
   color:white;
   box-shadow: 0px 0px 4px 0px gray ;
   border-radius:10px;
   margin-left:10px;
   
`;

const ButtonSection = styled.div`
  margin-bottom: 20px;
`;


const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right:15px;
  background: ${props => props.gradient};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  margin-left: ${props => props.marginLeft || '0px'};


  &:hover {
    background: linear-gradient(to right, #0099ff, #0056b3);
  }
`;





export default PrimVisualization;
