'use client'
import styled from "styled-components";
import Checkout from "./components/Checkout";
import { ThemeProvider } from "./Context";
import { themeContext } from "./Context";
import Payment from "./components/Payment";

export default function Home() {

  return (
    <ThemeProvider>
    <Conatiner>
        <Checkout />
    </Conatiner>
    </ThemeProvider>
  ); 
}

const Conatiner = styled.div`
  
`
