import React from 'react'
// import './Toggle.css'
import { themeContext } from '../../Context'
import { useContext } from 'react'
import styled from 'styled-components';

function Toggle() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleClick = ()=>{
    theme.dispatch({type: 'toggle'})
  }

  return (
    <ToggleBox  onClick={handleClick}>
        <img  width="25" height="25" src="/moon.svg" alt="" />
        <img width="25" height="25" src="/sun.svg" alt="" />
    </ToggleBox>
  )
}

export default Toggle

const ToggleBox = styled.div`
   display: flex;
    justify-content: space-between;
    margin-right: 2.4rem;
    border: 1px solid black;
    border-radius: 3px;
    position: relative;
    
    cursor: pointer;
    img{
      padding: 5px;
      background-color: white;
    }

`
