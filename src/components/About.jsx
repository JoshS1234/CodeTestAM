import React from "react";
import { LoremIpsum } from "lorem-ipsum";
import officeImage from "../resources/shutterstock_1302552622.jpg";

export default function About() {
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

  return (
    <div>
      <h1>About us</h1>
      <div>
        <h3>{lorem.generateSentences(2)}</h3>
        <p>{lorem.generateParagraphs(2)}</p>
        <p>{lorem.generateParagraphs(2)}</p>
      </div>
      <img src={officeImage} />
      <div>
        <p>{lorem.generateParagraphs(2)}</p>
      </div>
      <div>
        <h3>{lorem.generateWords(10)}</h3>
        <strong>
          <ul>
            <li>{lorem.generateWords(8)}</li>
            <li>{lorem.generateWords(8)}</li>
            <li>{lorem.generateWords(8)}</li>
            <li>{lorem.generateWords(8)}</li>
          </ul>
        </strong>
      </div>
      <div>
        <p>{lorem.generateParagraphs(1)}</p>
      </div>
      <div>
        <p>{lorem.generateParagraphs(2)}</p>
      </div>
    </div>
  );
}
