import { useEffect, useState } from "react";
import Header from "../components/header";
import Story from "../components/Story";

export default function Newest() {
    const [stories, setStories] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3000/stories')
            .then(response => response.json())
            .then(response => {
                const now = new Date();
                const res = response.filter((item: { date: string | number | Date; }) => {
                    const createdDate = new Date(item.date);
                    const diffInHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
                    return diffInHours < 1;
                });
                setStories(res);
                console.log(res);
                
            })
            .catch(e => {
                console.error(`Error happened: ${e}`);
            });
    }, []);

    return (
        <>
            <Header/>
            <div className="stories-container">
                {!stories ? ( 
                    <h2>Loading ...</h2> 
                ) : (
                    stories.map((item, index) => {
                        const createdDate = new Date(item.date);
                        const minutesAgo = Math.floor((new Date() - createdDate) / (1000 * 60));
                        return (
                            <Story 
                                key={item._id} 
                                {...item} 
                                index={index}
                                timeAgo={`${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`}
                            />
                        );
                    })
                )}
            </div>
        </>
    );
}