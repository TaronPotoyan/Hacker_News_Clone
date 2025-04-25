import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";

interface ReplyType {
  author: string;
  text: string;
  date: Date | string;
  replies?: ReplyType[];
}

interface CommentType {
  author: string;
  text: string;
  date: Date | string;
  replies: ReplyType[];
}

interface StoryType {
  title: string;
  comments: CommentType[];
}


function Comments() {
  
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<StoryType | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch story');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setAuthor(localStorage.getItem("user") || "");
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Header />
      {id ? <Main res={data} id={id} author={author} /> : <p>Invalid ID</p>}
      <Footer creating_txt={"Comment"} />
    </>
  );
}

function Main({ res, id, author }: { res: StoryType | null; id: string; author: string }) {
  const [replies, setReplies] = useState<Record<number, ReplyType[]>>({});
  const [visibleReplies, setVisibleReplies] = useState<Record<number, boolean>>({});
  const [loadingReplies, setLoadingReplies] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  if (!res) return <p>Loading comments...</p>;

  const fetchReplies = async (index: number) => {
    setLoadingReplies(prev => ({ ...prev, [index]: true }));
    try {
      const response = await fetch(`http://localhost:3000/get_replays/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch replies');
      }

      const data = await response.json();
      setReplies(prev => ({ ...prev, [index]: data.replies }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingReplies(prev => ({ ...prev, [index]: false }));
    }
  };

  const toggleReplies = (index: number) => {
    setVisibleReplies(prev => ({ ...prev, [index]: !prev[index] }));
    if (!replies[index]) fetchReplies(index);
  };

  const handleNestedReply = async (path: number[], text: string) => {
    if (!text.trim()) {
      setError("Reply text cannot be empty");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/get_replays/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replyText: text,
          author,
          index: path[0],
          replyPath: path.slice(1),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post reply');
      }

      fetchReplies(path[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddReply = (index: number) => {
    const newReply = prompt("Enter your reply:");
    if (newReply) {
      handleNestedReply([index], newReply);
    }
  };

  return (
    <main className="comments-container">
      {error && <div className="error-message">{error}</div>}
      <h1>Comments for: {res.title}</h1>
      <div className="comments-wrapper">
        {res.comments?.length > 0 ? (
          res.comments.map((comment: CommentType, index: number) => (
            <div key={index} className="comment" style={{ marginBottom: "1em" }}>
              <div className="comment-header">
                <h3>Author: {comment.author}</h3>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleString()}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>

              <button 
                onClick={() => toggleReplies(index)}
                disabled={loadingReplies[index]}
                className="reply-toggle-btn"
              >
                {loadingReplies[index] ? "Loading..." : 
                 visibleReplies[index] ? "Hide replies" : "See replies"}
              </button>

              <button 
                onClick={() => handleAddReply(index)} 
                className="add-reply-btn"
              >
                Add Reply
              </button>
              
              {visibleReplies[index] && (
                <div className="replies" style={{ marginTop: "0.5em", paddingLeft: "1em" }}>
                  {replies[index]?.length > 0 ? (
                    replies[index].map((reply, i) => (
                      <Reply
                        key={i}
                        reply={reply}
                        replyPath={[i]}
                        onReply={handleNestedReply}
                        author={author}
                      />
                    ))
                  ) : (
                    <p>No replies yet.</p>
                  )}
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


const Reply = React.memo(function Reply({
  reply,
  replyPath,
  onReply,
  author,
}: {
  reply: ReplyType;
  replyPath: number[];
  onReply: (path: number[], text: string) => void;
  author: string;
}) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!input.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onReply(replyPath, input);
      setInput("");
      setShowInput(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reply" style={{ marginLeft: "20px", borderLeft: "1px solid gray", paddingLeft: "10px" }}>
      <div className="reply-header">
        <strong>{reply.author}</strong>
        <span className="reply-date">
          {new Date(reply.date).toLocaleString()}
        </span>
      </div>
      <p className="reply-text">{reply.text}</p>
      
      {author && (
        <button 
          onClick={() => setShowInput(!showInput)} 
          disabled={isSubmitting}
          className="reply-btn"
        >
          Reply
        </button>
      )}
      
      {showInput && (
        <div className="reply-input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSubmitting}
            placeholder="Write your reply..."
            rows={3}
          />
          <div className="reply-actions">
            <button 
              onClick={handleReply} 
              disabled={isSubmitting || !input.trim()}
              className="submit-reply-btn"
            >
              {isSubmitting ? "Posting..." : "Submit"}
            </button>
            <button 
              onClick={() => setShowInput(false)}
              disabled={isSubmitting}
              className="cancel-reply-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {reply.replies?.map((r, i) => (
        <Reply
          key={i}
          reply={r}
          replyPath={[...replyPath, i]}
          onReply={onReply}
          author={author}
        />
      ))}
    </div>
  );
});

export default Comments;