import React from 'react';
import styled from 'styled-components';
import { PropagateLoader } from 'react-spinners';

const Wrapper = styled.section`
  width: 100%;
  height: 20px;
  text-align: center;
  padding-left: 50%;
`;

const Spinner = () => (
  <Wrapper>
    <PropagateLoader color="#32383e" />
  </Wrapper>
);

export default Spinner;
