import React, { useEffect, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";

export default function Homepage() {
  const [homeData, setHomeData] = useState([]);
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

  useEffect(() => {
    fetch(
      "https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.Details);
        const displayData = data.Details.map((item) => {
          return (
            <div>
              <li>
                <h1>{item.Title}</h1>
                <h1>{item.Subtitle}</h1>
                <img src={item.ImageUrl} class="homepageImage" />
              </li>
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
        });
        console.log(Array.isArray(displayData));
        setHomeData(displayData);
      });
  }, []);

  return <ul>{homeData}</ul>;
}
