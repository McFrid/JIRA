import React from 'react';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .1);
  z-index: 10;
`;

const FullScreenSpinner = () => (
  <Wrapper>
    <PulseLoader size={20} margin={'10px'} color={"#fff"} className={"hello"}/>
  </Wrapper>
);

export default FullScreenSpinner;
