import React from "react";
import white from "../images/tinder_logo_white.png";
import color from "../images/color-logo-tinder.png";
import styled from "styled-components";

function Navbar({ authToken, minimal, setShowModal, showModal, setIsSignUp }) {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <Nav>
      <div className="logo_container">
        <img src={minimal ? color : white} alt="" className="logo" />
      </div>

      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </Nav>
  );
}

export default Navbar;

const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .logo_container {
    width: 170px;
    margin: 15px;
  }

  .logo {
    width: 100%;
  }

  .nav-button {
    height: 45px;
    color: rgb(254, 48, 114);
    background-color: rgb(255, 255, 255);
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    margin: 10px;
    cursor: pointer;

    &:hover {
      background-color: rgb(189, 180, 180);
    }

    &:disabled {
      background-color: rgb(189, 180, 180);
      color: rgb(160, 38, 75);
    }
  }
`;
