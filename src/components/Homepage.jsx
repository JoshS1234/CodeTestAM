import React, { useEffect, useState } from "react";

export default function Homepage() {
  const [homeData, setHomeData] = useState([]);

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
            <li>
              <h1>{item.Title}</h1>
              <h1>{item.Subtitle}</h1>
              <img src={item.ImageUrl} class="homepageImage" />
            </li>
          );
        });
        console.log(Array.isArray(displayData));
        setHomeData(displayData);
      });
  }, []);

  return <ul>{homeData}</ul>;
}
