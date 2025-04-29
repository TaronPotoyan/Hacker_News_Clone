import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Story({ _id, author, title, url, date, index, score = 0 }: StoryProps & { index: number }) {
    const user = localStorage.getItem('user');
    const [liked, setLiked] = useState(
        localStorage.getItem(`liked_${_id}_${user}`) === "true"
    );
    const [islogged, setLogged] = useState(user != null);
    const [innerscore, setinnerscore] = useState(score);

    const navigate = useNavigate();

    const LikeHandler = async () => {
        if (!islogged) {
            alert('please log in');
            navigate('/login');
            return;
        }

        fetch(`http://localhost:3000/stories/like/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, add: !liked })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response.message);
            localStorage.setItem(`liked_${_id}_${user}`, (!liked).toString());
            setLiked(!liked);
            setinnerscore(response.newScore);
        })
        .catch(err => console.error('Error liking story:', err));
    };

    return (
        <div className="Story">
            <h3>
                <a href={'#'}>
                    {index + 1}: {title}
                </a>
            </h3>
            <b>{author}</b>
            <h3>{new Date(date).toLocaleString()}</h3>
            <Link to={`/story/comm/${_id}`}>Comments</Link>
            <button
                onClick={LikeHandler}
                style={{
                    backgroundColor: islogged ? (liked ? "#ff6600" : "#f0f0f0") : "white",
                    color: liked ? "white" : "black",
                    border: liked ? "1px solid #4caf50" : "1px solid gray",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                title={liked ? "You liked this" : "Click to like"}
            >
                👍 : {innerscore}
            </button>
        </div>
    );
}
