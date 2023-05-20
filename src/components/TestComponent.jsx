import React, { useState } from "react";
import axios from "axios";

export default function TestComponent() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  fetch(
    "https://interview-assessment.api.avamae.co.uk/api/v1/home/banner-details"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.Details);
    });
}
