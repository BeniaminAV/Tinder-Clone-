import React from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCookies } from "react-cookie";

function ChatHeader({ user }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };

  return (
    <Container>
      <div className="proferile">
        <div className="img-container">
          <img src={user.url} alt={"Photo" + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="log-out-icon" onClick={logout}>
        <AiOutlineArrowLeft />
      </i>
    </Container>
  );
}

export default ChatHeader;

const Container = styled.div`
  background: linear-gradient(45deg, rgb(254, 48, 114), rgb(255, 89, 64));
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .profile,
  .log-out-icon {
    padding: 20px;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .img-container {
    height: 30px;
    width: 30px;
    border-radius: 15px;
    overflow: hidden;
    margin: 10px;

    img {
      width: 100%;
    }
  }
`;
