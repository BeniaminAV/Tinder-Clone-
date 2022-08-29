import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import img from "../images/tinder.webp";
import { useCookies } from "react-cookie";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  const authToken = cookies.authToken;

  const handleClick = () => {
    if (authToken) {
      removeCookies("UserId", cookies.UserId);
      removeCookies("AuthToken", cookies.AuthToken);
      window.location.reload();
    }
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <Background>
      <Navbar
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">
          Swipe Right<span>®</span>
        </h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </Background>
  );
}

export default Home;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${img});

  .primary-title {
    margin-top: 30vh;
    font-size: 90px;
    color: rgba(255, 255, 255);

    span {
      position: absolute;
      font-size: 50px;
    }
  }
`;
