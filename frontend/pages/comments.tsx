import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";



function Comments() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  
  useEffect(() => {
    fetch(`http://localhost:3000/stories/${id}`) 
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        
        setData(result);
      });
  }, [id]);

  return (
    <>
      <Header />
      <Main res={data} id={`${id}`}/>
      <Footer creating_txt={"Comment"}/>
    </>
  );
}

export default Comments;

function Main({ res , id }: { res: any ; id : string}) {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  if (!res) return <p>Loading comments...</p>;

  const handleReplyClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
    setReplyText("");
  };

  const handleAddReply = (index: number) => {
    setReplyText("");
    setActiveIndex(null);
  };

const handlReplComm = (index : number){

}
  return (
    <main>
      <h1>Comments for: {res.title}</h1>
      <div className="comments-wrapper">
        {res.comments && res.comments.length > 0 ? (
          res.comments.map((comment: any, index: number) => (

              <div key={index} className="comm" style={{ marginBottom: "1em" }}>
                <h3>Author: {comment.author}</h3>
                <p>{comment.text} : {comment.date}</p>
                <button onClick={() => handleReplyClick(index)}>Add reply</button>
                <div className="replies">
                  { comment.replies.map((replay,index) => {
                          <p key={index}>replay</p>
                  })}
                </div>
                {activeIndex === index && (
                  <div style={{ marginTop: "0.5em" }}>
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                    />
                    <button onClick={() => handleAddReply(index)}>Submit</button>
                    
                  </div>

                )}

              </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </main>
  );
  
}


