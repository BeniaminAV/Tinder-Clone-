import { useState } from "react";
import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookies] = useCookies("user");
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log("submited");
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      const succes = response.status === 200;
      if (succes) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <>
      <OnBoard>
        <Navbar minimal={true} setShowModal={() => {}} showModal={false} />
        <MainBoarding>
          <h2>CREATE ACCOUNT</h2>

          <form onSubmit={handleSubmit}>
            <section>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="First Name"
                required={true}
                value={formData.first_name}
                onChange={handleChange}
              />

              <label>Birthday</label>
              <div className="multiple-input-container">
                <input
                  id="dob_day"
                  type="number"
                  name="dob_day"
                  placeholder="DD"
                  required={true}
                  value={formData.dob_day}
                  onChange={handleChange}
                />
                <input
                  id="dob_month"
                  type="number"
                  name="dob_month"
                  placeholder="MM"
                  required={true}
                  value={formData.dob_month}
                  onChange={handleChange}
                />
                <input
                  id="dob_year"
                  type="number"
                  name="dob_year"
                  placeholder="YYYY"
                  required={true}
                  value={formData.dob_year}
                  onChange={handleChange}
                />
              </div>

              <label>Gender</label>
              <div className="multiple-input-container">
                <input
                  id="man-gender-identity"
                  type="radio"
                  name="gender_identity"
                  value="man"
                  onChange={handleChange}
                  checked={formData.gender_identity === "man"}
                />

                <label htmlFor="man-gender-identity">Man</label>
                <input
                  id="woman-gender-identity"
                  type="radio"
                  name="gender_identity"
                  value="woman"
                  onChange={handleChange}
                  checked={formData.gender_identity === "woman"}
                />

                <label htmlFor="woman-gender-identity">Woman</label>
                <input
                  id="more-gender-identity"
                  type="radio"
                  name="gender_identity"
                  value="more"
                  onChange={handleChange}
                  checked={formData.gender_identity === "more"}
                />
                <label htmlFor="more-gender-identity">More</label>
              </div>

              <label htmlFor="show-gender">Show Gender on my Profile</label>
              <input
                id="show-gender"
                type="checkbox"
                name="show_gender"
                onChange={handleChange}
                checked={formData.show_gender}
              />

              <label>Show Me</label>
              <div className="multiple-input-container">
                <input
                  id="man-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="man"
                  onChange={handleChange}
                  checked={formData.gender_interest === "man"}
                />

                <label htmlFor="man-gender-interest">Man</label>
                <input
                  id="woman-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="woman"
                  onChange={handleChange}
                  checked={formData.gender_interest === "woman"}
                />

                <label htmlFor="woman-gender-interest">Woman</label>
                <input
                  id="everyone-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="everyone"
                  onChange={handleChange}
                  checked={formData.gender_interest === "everyone"}
                />
                <label htmlFor="everyone-gender-interest">Everyone</label>
              </div>

              <label htmlFor="about">About Me</label>
              <input
                id="about"
                type="text"
                name="about"
                required={true}
                placeholder="I like long walks..."
                value={formData.about}
                onChange={handleChange}
              />
              <input type="submit" />
            </section>

            <section>
              <label htmlFor="Profile">About Profile</label>
              <input
                type="url"
                name="url"
                id="url"
                onChange={handleChange}
                required={true}
              />
              <div className="photo-container">
                {formData.url && (
                  <img src={formData.url} alt="profile pic view" />
                )}
              </div>
            </section>
          </form>
        </MainBoarding>
      </OnBoard>
    </>
  );
};

export default OnBoarding;

const MainBoarding = styled.div`
  border-top: solid 1px rgb(154, 154, 154);
  h2 {
    font-style: italic;
  }
`;

const OnBoard = styled.div`
  form {
    display: flex;
    justify-content: center;

    section {
      display: flex;
      flex-direction: column;
      padding: 20px;
      width: 35%;
      text-align: start;
    }

    input {
      padding: 15px 30px;
      margin: 10px 0;
      font-size: 15px;
      border: solid 2px rgb(219, 219, 219);
      border-radius: 10px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .multiple-input-container {
      display: flex;
      flex-direction: row;

      input {
        margin-right: 10px;
      }

      label {
        padding: 10px;
        border: solid 2px rgb(144, 144, 144);
        border-radius: 10px;
        trasition: all 0.3s;
        margin-right: 10px;
      }

      input[type="radio"] {
        display: none;
      }

      input[type="number"] {
        width: 10%;
      }
    }

    label {
      margin: 10px 0;
    }

    input[type="radio"]:checked + label {
      border: solid 2px rgb(221, 39, 22);
    }

    input[type="submit"]:hober {
      background-color: rgb(235, 235, 235);
    }

    input[type="submit"]:active {
      background-color: rgb(226, 115, 155);
    }

    .photo-container {
      width: 100%;
      height: 100%;
      background-color: rgb(235, 235, 235);
    }

    .photo-container img {
      width: 100%;
    }
  }
`;
