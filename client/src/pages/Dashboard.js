import React, { useEffect } from "react";
import styled from "styled-components";
import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user])

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMatches = async (matchesUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchesUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  return (
    <>
      {user && (
        <Container className="dashboard">
          <div className="dashboard">
            <ChatContainer user={user} />
            <div className="swiper-container">
              <div className="card-container">
                {filteredGenderedUsers?.map((genderedUser) => (
                  <TinderCard
                    className="swipe"
                    key={genderedUser.user_id}
                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                  >
                    <div
                      style={{
                        backgroundImage: "url(" + genderedUser.url + ")",
                      }}
                      className="card"
                    >
                      <h3>{genderedUser.first_name}</h3>
                    </div>
                  </TinderCard>
                ))}
                <div className="swipe-info">
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Dashboard;

const Container = styled.div`
  .dashboard {
    display: flex;
    justify-content: space-between;

    .swiper-container {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card-container {
      width: 400px;
      height: 650px;
      border-radius: 30px;
      background-size: cover;
      background-position: center;
    }

    .swipe-info {
      position: absolute;
      bottom: 0;
      padding: 10px;
    }
  }

  .swipe {
    position: absolute;
  }

  .card {
    background-color: #fff;
    width: 400px;
    height: 650px;
    border-radius: 30px;
    background-size: cover;
    background-position: center;
  }

  .card h3 {
    margin-top: 0;
  }
`;
