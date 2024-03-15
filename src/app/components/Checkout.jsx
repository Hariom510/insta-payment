"use client";
import React from "react";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Payment from "./Payment";
import Toggle from "./Toggle/Toggle";
import { themeContext } from "../Context";

function Checkout() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [address, setAddress] = useState(
    "Hariom Kumar, Mobile: +91-1234567890, Address: Room-#1, Ground Floor, A1 Building, Dumra, Sitamarhi-843320"
  );
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://groww-intern-assignment.vercel.app/v1/api/order-details`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const actualData = await response.json();
        if (isMounted) {
          setData(actualData);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  let totalAmount = 0;
  let totalItems = 0;
  if (data) {
    data.products.forEach((val) => {
      totalAmount += val.price;
      totalItems += 1;
    });
  }
  useEffect(() => {
    if (totalItems > 0) {
      setIsClickable(true);
    }
  }, [totalItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!payment ? (
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
              src="/arrow.svg"
            />
            <p>Checkout</p>
            <div>
              <Toggle />
            </div>
          </FirstChild>

          <SecondChild>
            <p>Your Cart</p>
            <div>{totalItems} items</div>
          </SecondChild>

          <ThirdChild>
            <ThirdInnerChild1>
              <div>
                <IMG src="/house.svg" alt="location" />
                <p style={{ color: darkMode ? "black" : "" }} className="home">
                  {" "}
                  HOME{" "}
                </p>
              </div>
              <div onClick={(e) => setIsInputVisible(true)}>
                <IMG src="/edit.svg" alt="edit" />
                <p className="edit"> Edit </p>
              </div>
            </ThirdInnerChild1>
            <ThirdInnerChild2>
              {isInputVisible ? (
                <div>
                  <input
                    autoFocus="true"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button onClick={(e) => setIsInputVisible(false)}>
                    Done
                  </button>
                </div>
              ) : (
                <p style={{ color: darkMode ? "black" : "" }}>{address}</p>
              )}
            </ThirdInnerChild2>
          </ThirdChild>

          <FourthChild>
            {loading && <div>A moment please...</div>}
            {error && (
              <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}

            {data &&
              data.products &&
              data.products.map((val, idx, arr) => {
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
                      <Icon> + </Icon>
                      <p>{val.quantity} </p>
                      <Icon> - </Icon>{" "}
                    </ProductQuantity>
                  </OrderItems>
                );
              })}
          </FourthChild>

          <FifthChild>
            <strong style={{ color: darkMode ? "white" : "" }}>
              Promo Code
            </strong>
            <FifthInnerChild>
              <p>DISCOUNTDEDO</p> <strong>APPLY</strong>
            </FifthInnerChild>
            <h5>Voucher applied</h5>
          </FifthChild>

          <SixthChild>
            <h3>Order Summary</h3>
            <SixthInnerChild>
              <div>
                <p>
                  Subtotal <strong>({totalItems} items)</strong>
                </p>{" "}
                <p>&#8377; {totalAmount}</p>
              </div>
              <div>
                <p>Delivery Fee</p> <p>&#8377; 10.00</p>
              </div>
              <div>
                <p>Discount</p> <p>&#8377; 10.00</p>
              </div>
              <div>
                <h4>Total </h4> <h4>&#8377; {totalAmount}</h4>
              </div>
            </SixthInnerChild>
          </SixthChild>

          <SeventhChild>
            <button
              style={{ opacity: isClickable ? "1" : "0.6" }}
              disabled={!isClickable}
              onClick={(e) => setPayment(true)}
            >
              Payment
            </button>
          </SeventhChild>
        </Container>
      ) : (
        <Payment
          data={data}
          totalAmount={totalAmount}
          totalItems={totalItems}
        />
      )}
    </>
  );
}

export default Checkout;

const Container = styled.div`
  display: flex;
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
  div {
    font-size: 1rem;
    font-weight: 550;
    margin-left: 1rem;
    
    padding: 12px;
    background-color: #03a4b0;
    border-radius: 6px;
  }
`;

const ThirdChild = styled.div`
  width: 90%;
  border: 2px solid #03a4b0;
  border-radius: 8px;
  margin: 1.3rem auto;
  background-color: #e7ebef;
  padding: 10px;
  div {
    display: flex;
  }
  .home {
    font-weight: 600;
    margin-left: 0.8rem;
    margin-bottom: 0.6rem;
  }
  .edit {
    font-weight: 400;
    color: #03a4b0;
    cursor: pointer;
    margin-left: 0.5rem;
    margin-right: 1rem;
  }
`;
const ThirdInnerChild1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IMG = styled.img`
  width: 20px;
  height: 20px;
`;
const ThirdInnerChild2 = styled.div`
  display: flex;
  flex-direction: column;
  p {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
  }
  input {
    width: 100%;
    height: 40px;
    font-size: 1rem;
    padding: 5px;
    border: none;
    outline: none;
    background-color: #e7ebef;
  }
  button {
    font-size: 1rem;
    font-weight: 600;
    margin: 2px;
    width: 80px;
    display: inline-block;
    padding: 8px;
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
`;

const FourthChild = styled.div`
  width: 100%;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const OrderItems = styled.div`
  display: flex;
  width: 100%;
  padding: 4%;
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
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  text-align: center;
  p {
    font-size: 0.9rem;
    font-weight: bold;
    width: 38px;
    border: 1px solid #4f4d4d;
    border-radius: 2px;
    padding: 3px 5px;
    margin: auto 5px;
  }
`;
const Icon = styled.div`
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #4f4d4d;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FifthChild = styled.div`
  width: 90%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  strong {
    font-size: 1.1rem;
    font-weight: 600;
    /* color: #4f4d4d; */
  }
  p {
    font-size: 1rem;
    font-weight: 500;
    /* color: #4f4d4d; */
  }
  h5 {
    margin-top: 0.4rem;
  }
`;
const FifthInnerChild = styled.div`
  margin-top: 1rem;
  border: 1px solid #4f4d4d;
  border-radius: 1px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  strong {
    color: #03a4b0;
    cursor: pointer;
  }
`;
const SixthChild = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 2rem auto;
`;
const SixthInnerChild = styled.div`
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
const SeventhChild = styled.div`
  width: 90%;
  display: flex;
  margin: 1.5% auto;
  justify-content: center;

  p {
    font-size: 1.5rem;
    font-weight: 500;
    /* color: #4f4d4d; */
  }
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
`;
