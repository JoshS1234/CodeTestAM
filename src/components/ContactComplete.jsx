import React, { useEffect, useState } from "react";
import bigLogo from "../resources/Img_Contact.png";
import "./stylesheets/ContactComplete.css";
import { LoremIpsum } from "lorem-ipsum";
import tick from "../resources/Icon_Valid.svg";

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

export default function ContactComplete() {
  return (
    <div id="contactSubmittedPageContainer">
      <div id="messageContainer">
        <div id="contactSubmittedFormIntro">
          <h1>Contact us</h1>
          <p>{randomSentence}</p>
          <div id="messageTextbox">
            <img src={tick} id="validTick" />
            <h3>Your message has been sent</h3>
            <p>We will be in contact with you within 24 hours</p>
          </div>
        </div>
      </div>
      <div
        id="contactSubmittedImageContainer"
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
