import React from "react";
import styled from "styled-components";

function Chat({ descendingOrderMessages }) {
  return (
    <Container>
      <div className="chat-display">
        {descendingOrderMessages.map((message, _index) => (
          <div key={_index}>
            <div className="chat-message-header">
              <div className="img-container">
                <img src={message.img} alt={message.name + " profile"} />
              </div>
              <h2>{message.name}</h2>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  .chat-display {
    padding: 20px;
    height: 60vh;
    overflow-y: auto;
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

  h2 {
    font-size: 1em;
  }

  p {
    font-size: 0.8em;
  }
`;
