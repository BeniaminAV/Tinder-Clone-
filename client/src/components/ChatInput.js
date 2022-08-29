import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ChatInput = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      await axios.post("http://localhost:8000/message", { message });
      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Contaier>
      <div className="chat-input">
        <textarea
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        />
        <button className="secondary-button" onClick={addMessage}>
          Submit
        </button>
      </div>
    </Contaier>
  );
};

export default ChatInput;

const Contaier = styled.div`
  .chat-input {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .secondary-button {
    color: rgb(121, 119, 119);
    background-color: rgb(255, 255, 255);
    font-size: 20px;
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
