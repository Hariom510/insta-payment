"use client";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Checkout from "./Checkout";
import OrderConfirmation from "./OrderConfirmation";
import { themeContext } from "../Context";
import Toggle from "./Toggle/Toggle";

function Payment(props) {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [checkout, setCheckout] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isClickable, setIsClickable] = useState(false);

  const handleClick = (e) => {
    setOrderConfirmation(true);
  };

  const handleInput = (e) => {
    setPaymentMethod(e.target.value);
    setIsClickable(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {!checkout && !orderConfirmation ? (
        <Container
          style={{
            background: darkMode ? "black" : "",
            color: darkMode ? "white" : "black",
          }}
        >
          <FirstChild>
            <LeftArrow
              style={{
                background: darkMode ? "white" : "",
                color: darkMode ? "white" : "",
              }}
              onClick={(e) => setCheckout(true)}
              src="/arrow.svg"
            />
            <p>Payment</p>
            <div>
              <Toggle />
            </div>
          </FirstChild>

          <SecondChild>
            <p style={{
            color:  "black",
          }}>Choose Payment Method</p>
          </SecondChild>

          <ThirdChild>
            {props.data &&
              props.data.paymentMethods.map((val,idx) => {
                return (
                  <ThirdInnerChild key={idx}>
                    <p style={{
                      color:  "black",
                    }}>{val}</p>
                    <input
                    
                      onChange={handleInput}
                      value={val}
                      name="val"
                      type="radio"
                    />
                  </ThirdInnerChild>
                );
              })}
          </ThirdChild>

          <FourthChild>
            <div>
              <p>Admin Fee</p>
              <p>&#8377; 0.00</p>
            </div>
            <div>
              <h4>Total</h4> <h4>&#8377; {props.totalAmount}</h4>
            </div>
            <button
              style={{ opacity: isClickable ? "1" : "0.6" }}
              disabled={!isClickable}
              onClick={handleClick}
            >
              Make a payment
            </button>
          </FourthChild>
        </Container>
      ) : (
        <>
          {checkout ? (
            <Checkout />
          ) : (
            <OrderConfirmation
              paymentMethod={paymentMethod}
              data={props.data}
              totalAmount={props.totalAmount}
              totalItems={props.totalItems}
            />
          )}
        </>
      )}
    </>
  );
}

export default Payment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120vh;
  background-color: #fcfdfe;
  border-radius: 3px;
`;
const FirstChild = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  p {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0;
    flex-grow: 1;
    text-align: center;
  }
`;
const LeftArrow = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 3rem;
  cursor: pointer;
`;
const SecondChild = styled.div`
  width: 100%;
  margin-top: 1rem;
  background-color: #aff3f9;
  padding: 5px;
  display: flex;
  p {
    width: auto;
    font-size: 1.1rem;
    font-weight: bold;
    /* color: #4f4d4d; */
    padding: 12px;
    margin-left: 2rem;
  }
`;
const ThirdChild = styled.div`
  width: 90%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
`;
const ThirdInnerChild = styled.div`
  width: 90%;
  border: 2px solid #03a4b0;
  border-radius: 8px;
  margin: 1rem auto;
  background-color: #e7ebef;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  img {
    width: 30px;
    height: 30px;
  }
  p {
    width: auto;
    font-size: 1rem;
    font-weight: bold;
    /* color: #4f4d4d; */
  }
  input {
    width: 40px;
    height: 20px;
    cursor: pointer;
  }
`;

const FourthChild = styled.div`
  width: 80%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    display: inline-block;
    padding: 14px 20px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: #03a4b0;
    outline: none;
    border: none;
  }
`;
