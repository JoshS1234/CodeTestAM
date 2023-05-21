import React, { useEffect, useState } from "react";
import bigLogo from "../resources/Img_Contact.png";
import "./stylesheets/Contact.css";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const randomSentence = lorem.generateSentences(1);

export default function Contact() {
  const emptyStateObj = {
    fullName: "",
    emailAddress: "",
    phoneNum: "",
    phoneNum2: "",
    message: "",
    address1: "",
    address2: "",
    city: "",
    stateCounty: "",
    postcode: "",
    country: "",
  };
  const [stateObj, setStateObj] = useState(emptyStateObj);

  const [phone2isOn, setPhone2isOn] = useState(false);
  const [addressIsOn, setAddressIsOn] = useState(false);

  function dataChecks(formData) {
    let errorMessage = "";
    let validDetails = true;

    if (!formData.fullName) {
      errorMessage += "enter your full name \n";
      validDetails = false;
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        formData.emailAddress
      )
    ) {
      errorMessage += "enter a valid email \n";
      validDetails = false;
    }

    if (formData.phoneNum.length > 0) {
      if (!/^\+?[0-9]{1,20}$/.test(formData.phoneNum)) {
        errorMessage += "enter a valid phone number \n";
        validDetails = false;
      }
    }

    if (phone2isOn) {
      if (!/^\+?[0-9]{1,20}$/.test(formData.phoneNum2)) {
        errorMessage += "enter a valid (second) phone number \n";
        validDetails = false;
      }
    }

    if (formData.message.length === 0) {
      errorMessage += "enter a message \n";
      validDetails = false;
    } else if (formData.message.length > 500) {
      errorMessage += "enter a message under 500 characters \n";
      validDetails = false;
    }

    if (addressIsOn) {
      if (formData.address1 === "") {
        errorMessage += "enter address line 1 \n";
        validDetails = false;
      }

      if (formData.city === "") {
        errorMessage += "enter a city/town \n";
        validDetails = false;
      }

      if (formData.stateCounty === "") {
        errorMessage += "enter a state/county \n";
        validDetails = false;
      }

      if (
        !/^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/.test(
          formData.postcode
        )
      ) {
        errorMessage += "enter a valid postcode \n";
        validDetails = false;
      }

      if (formData.country === "") {
        errorMessage += "enter a state/county \n";
        validDetails = false;
      }
    }

    return [errorMessage, validDetails];
  }

  function handleSubmit(e) {
    e.preventDefault();
    const [errorMessage, validDetails] = dataChecks(stateObj);
    if (!validDetails) {
      alert(errorMessage);
    } else {
      let phoneArr = [];
      if (phone2isOn) {
        phoneArr = [stateObj.phoneNum, stateObj.phoneNum2];
      } else {
        phoneArr = [stateObj.phoneNum];
      }

      let requestObj = {};

      if (addressIsOn) {
        requestObj = {
          FullName: stateObj.fullName,
          EmailAddress: stateObj.emailAddress,
          PhoneNumbers: phoneArr,
          Message: stateObj.message,
          bIncludeAddressDetails: addressIsOn,
          AddressDetails: {
            AddressLine1: stateObj.address1,
            AddressLine2: stateObj.address2,
            CityTown: stateObj.city,
            StateCounty: stateObj.stateCounty,
            Postcode: stateObj.postcode,
            Country: stateObj.country,
          },
        };
      } else {
        requestObj = {
          FullName: stateObj.fullName,
          EmailAddress: stateObj.emailAddress,
          PhoneNumbers: phoneArr,
          Message: stateObj.message,
          bIncludeAddressDetails: addressIsOn,
        };
      }

      console.log(requestObj);

      fetch(
        "https://interview-assessment.api.avamae.co.uk/api/v1/contact-us/submit",
        {
          method: "POST",
          body: JSON.stringify(requestObj),
          headers: { "Content-Type": "application/json-patch+json" },
        }
      )
        .then((res) => {
          console.log(res);
          setStateObj(emptyStateObj);
          alert("Your message has been sent!");
        })
        .catch(function (error) {
          console.log(error);
          alert("Something went wrong. Try again later...");
        });
    }
  }

  function handleChange(e) {
    const newObject = { ...stateObj };
    newObject[e.target.name] = e.target.value;
    setStateObj(newObject);
  }

  useEffect(() => {}, [phone2isOn, addressIsOn]);

  return (
    <div id="contactPageContainer">
      <div id="formContainer">
        <div id="contactFormIntro">
          <h1>Contact us</h1>
          <p>{randomSentence}</p>
        </div>
        <form onSubmit={handleSubmit} id="dataForm">
          <div id="nameEmail">
            <label className="dataInput2">
              Full name:
              <input
                className="textInputBox"
                type="text"
                value={stateObj.fullName}
                onChange={(e) => handleChange(e)}
                name="fullName"
              />
            </label>
            <label className="dataInput2">
              Email address:
              <input
                className="textInputBox"
                type="text"
                value={stateObj.emailAddress}
                onChange={(e) => handleChange(e)}
                name="emailAddress"
              />
            </label>
          </div>
          <div id="otherInfoInputs">
            <label className="dataInput">
              Phone number 01 (optional):
              <input
                className="textInputBox"
                type="text"
                value={stateObj.phoneNum}
                onChange={(e) => handleChange(e)}
                name="phoneNum"
              />
            </label>

            {phone2isOn && (
              <label className="dataInput">
                Phone number 02 (optional):
                <input
                  className="textInputBox"
                  type="text"
                  value={stateObj.phoneNum2}
                  onChange={(e) => handleChange(e)}
                  name="phoneNum2"
                />
              </label>
            )}
            <input
              className="optionButton"
              value="Add new phone number"
              type="button"
              onClick={() => {
                setPhone2isOn(!phone2isOn);
              }}
            />
            <label className="dataInput">
              Message:
              <textarea
                className="textInputBox"
                id="messageInput"
                type="textarea"
                value={stateObj.message}
                onChange={(e) => handleChange(e)}
                name="message"
              ></textarea>
            </label>
          </div>

          <label className="optionCheckbox">
            <input
              value="address"
              type="checkbox"
              onClick={() => {
                setAddressIsOn(!addressIsOn);
              }}
            />
            <p>Add address details</p>
          </label>

          {addressIsOn && (
            <div id="addressSection">
              <div id="addressLines">
                <label className="dataInput2">
                  Address line 1:
                  <input
                    className="textInputBox"
                    type="text"
                    value={stateObj.address1}
                    onChange={(e) => handleChange(e)}
                    name="address1"
                  />
                </label>
                <label className="dataInput2">
                  Address line 2:{" "}
                  <input
                    className="textInputBox"
                    type="text"
                    value={stateObj.address2}
                    onChange={(e) => handleChange(e)}
                    name="address2"
                  />
                </label>
              </div>
              <label className="dataInput">
                City/Town:{" "}
                <input
                  className="textInputBox"
                  type="text"
                  value={stateObj.city}
                  onChange={(e) => handleChange(e)}
                  name="city"
                />
              </label>
              <label className="dataInput">
                State/County:{" "}
                <input
                  className="textInputBox"
                  type="text"
                  value={stateObj.stateCounty}
                  onChange={(e) => handleChange(e)}
                  name="stateCounty"
                />
              </label>
              <label className="dataInput">
                Postcode:{" "}
                <input
                  className="textInputBox"
                  type="text"
                  value={stateObj.postcode}
                  onChange={(e) => handleChange(e)}
                  name="postcode"
                />
              </label>
              <label className="dataInput">
                Country:{" "}
                <input
                  className="textInputBox"
                  type="text"
                  value={stateObj.country}
                  onChange={(e) => handleChange(e)}
                  name="country"
                />
              </label>
            </div>
          )}

          <input type="submit" name="submit" id="submitButton" />
        </form>
      </div>
      <div
        id="contactImageContainer"
        style={{
          backgroundImage: "url(" + bigLogo + ")",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}
