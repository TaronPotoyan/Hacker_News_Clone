import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Story from "../components/Story"; 

interface AskPost {
  _id: string;
  title: string;
  author: string;
  date: string;
  score?: number;
  comments?: number;
}

export default function Ask() {
  return (
    <>
      <Header />
      <Main />
      <Footer creating_txt="ask" author={""} />
    </>
  );
}

function Main() {
  const [asks, setAsk] = useState<AskPost[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/ask")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAsk(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      {asks === null ? (
        <h2>Loading...</h2>
      ) : asks.length > 0 ? (
        asks.map((ask, index) => {
          return <Story key={ask._id} {...ask} index={index} />;
        } 
        )
      ) : (
        <p>No Ask HN posts found.</p>
      )}
    </>
  );
}

