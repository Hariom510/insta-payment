"use client";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { StyleRegistry } from "styled-jsx";
import Checkout from "./Checkout";
import Toggle from "./Toggle/Toggle";
import { themeContext } from "../Context";

function OrderConfirmation(props) {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [checkout, setCheckout] = useState(false);
  const [paymentStatusValue, setPaymentStatusValue] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  let message;
  let note = "";
  useEffect(() => {
    const paymentStatus = ["Success", "Pending", "Failed"];
    const randomIndex = Math.floor(Math.random() * paymentStatus.length);
    const randomPaymentStatus = paymentStatus[randomIndex];
    setPaymentStatusValue(randomPaymentStatus);

    const randomOrderNumber = Math.floor(Math.random() * 2000);
    setOrderNumber(randomOrderNumber);
  }, []);
  switch (paymentStatusValue) {
    case "Success":
      message = "We have received your payment. Thank you!";
      note =
        "Thank you, your payment has been received and you don't need to take any further action. ";
      break;
    case "Pending":
      message = "Please wait, Your payment is pending.";
      break;
    case "Failed":
      message = "Your payment has failed. Please try again.";
      break;
    default:
      message = "Invalid payment status.";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {!checkout ? (
        <Container
          style={{
            background: darkMode ? "black" : "",
            color: darkMode ? "white" : "black",
          }}
        >
          <FirstChild>
            <p>Order Confirmation</p>
            <Toggle />
          </FirstChild>
          <SecondChild>
            <p
              style={{
                color:
                  paymentStatusValue === "Success"
                    ? "green"
                    : paymentStatusValue === "Pending"
                    ? "orange"
                    : "red",
              }}
            >
              {message}
            </p>
          </SecondChild>
          <ThirdChild>
            {note != "" && (
              <div>
                <p>Hey, Hariom </p>
                <p>{note}</p>
              </div>
            )}
          </ThirdChild>

          <OrderNumber>
            <p className="orderNo">Order No. #{orderNumber}</p>{" "}
            <p className="orderDate">placed on {formattedDate}</p>
          </OrderNumber>

          <OrderDetails>
            <h3>Order Details</h3>
            {props.data &&
              props.data.products &&
              props.data.products.map((val, idx, arr) => {
                return (
                  <OrderItems key={val.id}>
                    <div>
                      <ProductImg src={val.image} />
                    </div>
                    <ProductInfo>
                      <p>{val.title}</p> <br />
                      <div className="price"> &#x20B9; {val.price}</div>
                    </ProductInfo>
                    <ProductQuantity>
                      <strong>Qty:</strong> <p>{val.quantity} </p>
                    </ProductQuantity>
                  </OrderItems>
                );
              })}
          </OrderDetails>
          <OrderSummary>
            <h3>Order Summary</h3>
            <OrderSummaryChild>
              <div>
                <p>
                  Total <strong>({props.totalItems} items)</strong>
                </p>{" "}
                <p>&#8377; {props.totalAmount}</p>
              </div>
              <div>
                <p>Delivery Fee</p> <p>&#8377; 10.00</p>
              </div>
              <div>
                <p>Discount</p> <p>&#8377; 10.00</p>
              </div>
              <div>
                <p>Admin Fee</p> <p>&#8377; 0.00</p>
              </div>
              <div>
                <h4>Subtotal </h4> <h4>&#8377; {props.totalAmount}</h4>
              </div>
            </OrderSummaryChild>
          </OrderSummary>

          <PaymentDetails>
            <h3>Payment Details</h3>
            <PaymentDetailsChild>
              <div>
                <p>Payment Method</p> <strong> {props.paymentMethod}</strong>
              </div>
              <div>
                <p>Payment Status</p>{" "}
                <strong
                  style={{
                    color:
                      paymentStatusValue === "Success"
                        ? "green"
                        : paymentStatusValue === "Pending"
                        ? "orange"
                        : "red",
                  }}
                >
                  {" "}
                  {paymentStatusValue}
                </strong>
              </div>
              <div>
                <p>Amount</p> <strong>&#8377; {props.totalAmount}</strong>
              </div>
            </PaymentDetailsChild>
          </PaymentDetails>

          <Buttons>
            <button onClick={(e) => setCheckout(true)} className="cancel">
              Cancel Order
            </button>
            <button onClick={(e) => setCheckout(true)}>
              Continue Shopping
            </button>
          </Buttons>
        </Container>
      ) : (
        <Checkout />
      )}
    </>
  );
}

export default OrderConfirmation;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
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
const SecondChild = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  p {
    width: auto;
    font-size: 1.6rem;
    font-weight: 600;
    /* color: #4f4d4d; */
    margin-left: 2rem;
  }
`;
const OrderNumber = styled.div`
  width: 90%;
  margin: 1rem auto;
  .orderNo {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .orderDate {
    color: #4f4d4d;
  }
`;
const OrderDetails = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0px 20px;
  border-radius: 8px;
  display: flex;
  h3 {
    margin: 1rem auto 1.5rem auto;
  }
  flex-direction: column;
`;
const OrderItems = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #4f4d4d;
`;
const ProductImg = styled.img`
  width: 80px;
  height: 80px;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
  .price {
    font-weight: 600;
  }
`;
const ProductQuantity = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  margin-left: auto;
  text-align: center;
  p {
    font-size: 1rem;
    font-weight: 450;
    width: 38px;
    border-radius: 2px;
    padding: 3px 5px;
    margin: auto 0px;
  }
`;

const ThirdChild = styled.div`
  width: 90%;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
  }
  p {
    font-size: 1rem;
    margin-top: 0.3rem;
  }
`;
const OrderSummary = styled.div`
  width: 90%;
  margin: 2rem auto;
  border-bottom: 1px solid #4f4d4d;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: center;
  h3 {
    justify-content: center;
  }
`;

const OrderSummaryChild = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  div {
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
  }
  strong {
    font-size: 0.9rem;
  }
`;
const PaymentDetails = styled.div`
  width: 90%;
  margin: 0rem auto 1rem auto;
  border-bottom: 1px solid #4f4d4d;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: center;
  h3 {
    justify-content: center;
  }
`;
const PaymentDetailsChild = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  div {
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
  }
`;
const Buttons = styled.div`
  width: 90%;
  margin: 0rem auto 1rem auto;

  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  button {
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
  button:hover {
    opacity: 0.8;
  }
  .cancel {
    margin-right: 5rem;
  }
`;
