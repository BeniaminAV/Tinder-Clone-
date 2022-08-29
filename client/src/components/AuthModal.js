import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthModal({ setShowModal, setIsSignUp, isSignUp }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookies] = useCookies("user");

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Password need to match!");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
        { email, password }
      );

      setCookie("AuthToken", response.data.token);
      setCookie('UserId', response.data.userId)

      const success = response.status === 201;
      if (success && isSignUp) navigate("/onboarding");
      if (success && !isSignUp) navigate("/dashboard");

      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="auth-modal">
        <div className="close-icon" onClick={handleClick}>
          ⓧ
        </div>

        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
        <p>
          By clicking Log In, you agree to our terms. Learn how we process your
          data in our Privacy Policy and Cookie Policy.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && (
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="confirm password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input className="secondary-button" type="submit" />
          <p>{error}</p>
        </form>

        <hr />
        <h2>GET THE APP</h2>
      </div>
    </Container>
  );
}

export default AuthModal;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  margin-left: auto;
  margin-right: auto;
  max-width: 360px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 40px;

  .close-icon {
    float: right;
    cursor: pointer;
  }

  h2 {
    font-style: italic;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 8px;
    margin: 8px;
    font-size: 13px;
  }

  .secondary-button {
    color: rgb(121, 119, 119);
    background-color: rgb(255, 255, 255);
    font-size: 10px;
    text-transform: uppercase;
    border-radius: 30px;
    border: solid 2px rgb(121, 119, 119);
    margin: 6px;
    cursor: pointer;

    h2 {
      font-weight: 500;
    }

    &:hover {
      color: rgb(48, 48, 48);
      border: solid 2px rgb(48, 48, 48);
    }
  }
`;
