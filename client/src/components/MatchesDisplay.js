import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (erorr) {
      console.log(erorr);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id == userId)
        .length > 0
  );

  return (
    <>
      <Container>
        <div className="matches-display">
          {filteredMatchedProfiles?.map((match, _index) => (
            <div
              key={{ _index }}
              className="match-card"
              onClick={() => setClickedUser(match)}
            >
              <div className="img-container">
                <img src={match?.url} alt={match?.first_name + "profile"} />
              </div>
              <h3>{match?.first_name}</h3>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default MatchesDisplay;

const Container = styled.div`
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
