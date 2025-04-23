import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";

function Comments() {
  const { _id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/stories/${_id}`) 
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        
        setData(result);
      });
  }, [_id]);

  return (
    <>
      <Header />
      <Main res={data} />
      <Footer creating_txt={"Comment"} author={""}/>
    </>
  );
}

export default Comments;

function Main({ res }: { res: any }) {
  if (!res) return <p>Loading comments...</p>;

  return (
    <main>
      <h1>Comments for: {res.title}</h1>
      {res.comments && res.comments.length > 0 ? (
        res.comments.map((comment: any, index: number) => (
          <div key={index} className="comm">
            <h3>{comment.author}</h3>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </main>
  );
}
