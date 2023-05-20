import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [stateObj, setStateObj] = useState({
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
  });

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
        })
        .catch(function (error) {
          console.log(error);
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
    <form onSubmit={handleSubmit}>
      <label>
        Full name:{" "}
        <input
          type="text"
          value={stateObj.fullName}
          onChange={(e) => handleChange(e)}
          name="fullName"
        />
      </label>
      <label>
        Email address:{" "}
        <input
          type="text"
          value={stateObj.emailAddress}
          onChange={(e) => handleChange(e)}
          name="emailAddress"
        />
      </label>
      <label>
        Phone number 01 (optional):{" "}
        <input
          type="text"
          value={stateObj.phoneNum}
          onChange={(e) => handleChange(e)}
          name="phoneNum"
        />
      </label>
      <input
        value="phone number 2?"
        type="button"
        onClick={() => {
          setPhone2isOn(!phone2isOn);
        }}
      />
      {phone2isOn && (
        <label>
          Phone number 02 (optional):{" "}
          <input
            type="text"
            value={stateObj.phoneNum2}
            onChange={(e) => handleChange(e)}
            name="phoneNum2"
          />
        </label>
      )}
      <label>
        Message:{" "}
        <input
          type="text"
          value={stateObj.message}
          onChange={(e) => handleChange(e)}
          name="message"
        />
      </label>

      <input
        value="address"
        type="button"
        onClick={() => {
          setAddressIsOn(!addressIsOn);
        }}
      />

      {addressIsOn && (
        <div>
          <label>
            Address line 1:{" "}
            <input
              type="text"
              value={stateObj.address1}
              onChange={(e) => handleChange(e)}
              name="address1"
            />
          </label>
          <label>
            Address line 2:{" "}
            <input
              type="text"
              value={stateObj.address2}
              onChange={(e) => handleChange(e)}
              name="address2"
            />
          </label>
          <label>
            City/Town:{" "}
            <input
              type="text"
              value={stateObj.city}
              onChange={(e) => handleChange(e)}
              name="city"
            />
          </label>
          <label>
            State/County:{" "}
            <input
              type="text"
              value={stateObj.stateCounty}
              onChange={(e) => handleChange(e)}
              name="stateCounty"
            />
          </label>
          <label>
            Postcode:{" "}
            <input
              type="text"
              value={stateObj.postcode}
              onChange={(e) => handleChange(e)}
              name="postcode"
            />
          </label>
          <label>
            Country:{" "}
            <input
              type="text"
              value={stateObj.country}
              onChange={(e) => handleChange(e)}
              name="country"
            />
          </label>
        </div>
      )}
      <label>
        <input type="submit" name="submit" />
      </label>
    </form>
  );
}
