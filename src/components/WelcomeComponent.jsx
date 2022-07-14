import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif'

const WelcomeComponent = ({ currentUser }) => {

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Seleccione un chat.</h3>
    </Container>
  )
}

export default WelcomeComponent

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img {
  height: 15rem;
}
span {
  color: #4e00ff;
}
`;