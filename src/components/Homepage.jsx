import React, { useEffect, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import Carousel from "./Carousel";

export default function Homepage() {
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
      <Carousel />
      <div>
        <h3>{lorem.generateSentences(2)}</h3>
        <p>{lorem.generateParagraphs(2)}</p>
        <p>{lorem.generateParagraphs(2)}</p>
      </div>
      <div>
        <h3>{lorem.generateSentences(2)}</h3>
        <p>{lorem.generateParagraphs(2)}</p>
        <p>{lorem.generateParagraphs(2)}</p>
      </div>
    </div>
  );
}
