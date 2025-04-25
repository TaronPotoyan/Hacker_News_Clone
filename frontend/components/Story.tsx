import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Comment {
    author: string;
    text: string;
    date: string;
    replies?: Comment[];
}

interface StoryProps {
    _id: string;
    author: string;
    title: string;
    url: string;
    comments: Comment[];
    date: string;
    score: number;
}

export default function Story({ _id, author, title, url, date, index, score = 0 }: StoryProps & { index: number }) {
    const [liked, setLiked] = useState(localStorage.getItem(`liked_${_id}`) === "true");
    const [islogged, setLogged] = useState(localStorage.getItem('user') == null ? false : true);
    const navigate = useNavigate();
    const LikeHandler = async () => {
        if (liked) {
            if ( !islogged ) {
                alert('pleas log in');
                navigate('/login');
                return ;
            }
            
            fetch(`http://localhost:3000/stories/like/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id, add: false })
            })
            .then(res => res.json())
            .then(response => {
                console.log(response.message);
                localStorage.setItem(`liked_${_id}`, 'false');
                setLiked(false);
                window.location.reload();
            });
        } else {
            fetch(`http://localhost:3000/stories/like/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id, add: true })
            })
            .then(res => res.json())
            .then(response => {
                localStorage.setItem(`liked_${_id}`, 'true');
                setLiked(true);
                window.location.reload();
            });
        }
    };

    return (
        <div className="Story">
            <h3>
                <a href={url}>
                    {index + 1}: {title}
                </a>
            </h3>
            <b>{author}</b>
            <h3>{new Date(date).toLocaleString()}</h3>
            <Link to={`/story/comm/${_id}`}>Comments</Link>
            <button
                onClick={LikeHandler}
                style={{
                    backgroundColor:  islogged ?  (liked ? "#ff6600" : "#f0f0f0") : "white" ,
                    color: "black",
                    border: liked ? "1px solid #4caf50" : "1px solid gray",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                title={liked ? "You liked this" : "Click to like"}
            >
                👍 : {score}
            </button>
        </div>
    );
}
