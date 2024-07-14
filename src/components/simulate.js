import React, { useState } from 'react';
import PrimVisualization from './PrimeVisualization';
import styled from 'styled-components';

const Simulate = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#1e1e1e'); 
  
  

  const toggleAnimation = () => {
    setShowAnimation(!showAnimation);
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <LeftPanel showAnimation={showAnimation}>
        <Sidebar>
          <PrimVisualization showAnimation={showAnimation} />
        </Sidebar>
      </LeftPanel>
      <RightPanel>
        <Header>
          <h1>Prim's Algorithms Visualizer Board - Minimum Spanning Tree</h1>
        </Header>
       
        <Main>
          <GraphArea>
            <svg id="graph-svg"></svg>
          </GraphArea>
        </Main>
      </RightPanel>
     
      <BackgroundColorPicker
        type="color"
        value={backgroundColor}
        onChange={handleBackgroundColorChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  background-color: ${props => props.backgroundColor};
  margin-bottom:0%;
`;

const LeftPanel = styled.div`
  width: ${props => (props.showAnimation ? '25%' : '0%')};
  height: 150%;
  background-color: #333333;
  transition: width 0.3s ease;
  border: 1px solid #666666;
`;

const RightPanel = styled.div`
  width: 80%;
  height: 140%;
`;

const Header = styled.header`
  padding: 20px;
  color: #ffffff;
  background-color: #333333; 
  font-family:arial;
  font-size:9px;
  justify-content:center;
  border: 1px solid #444444;
  margin-top:100px;
`;

const Main = styled.div`
  height: calc(100vh - 100px);
`;

const Sidebar = styled.aside`
  padding: 20px;
`;

const GraphArea = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  

  svg {
    width: 70%;
    height: 90%;
    border: 1px solid #444444;
    border-radius: 4px;
    background-color: ${props => props.backgroundColor};
    justify-content:center;
    margin-top:-70px;
    padding-left:100px;
 
  }
`;
const BackgroundColorPicker = styled.input`
  position: absolute;
  top:146%;
  left: 50px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Simulate;
