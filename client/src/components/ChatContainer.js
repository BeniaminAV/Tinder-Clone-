import React from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";

function ChatContainer({ user }) {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <Container>
      <ChatHeader user={user} />

      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>

        {!clickedUser && (
          <MatchesDisplay
            matches={user.matches}
            setClickedUser={setClickedUser}
          />
        )}

        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
      </div>
    </Container>
  );
}

export default ChatContainer;

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 30%;
  text-align: left;
  z-index: 1;

  .option {
    border: none;
    background-color: rgb(255, 255, 255);
    border-bottom: solid 4px rgb(243, 33, 33);
    font-size: 20px;
    margin: 2px;
    padding: 10px;

    &:disabled {
      border-bottom: solid 4px rgb(187, 187, 187);
    }
  }
`;
