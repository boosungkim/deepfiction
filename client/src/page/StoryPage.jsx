import React from 'react'
import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

const StoryPage = () => {
  const storyID = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try{
        const response = await fetch('http://localhost:8080/api/v1/story',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if(response.ok){
          const result = await response.json();
          const fetchedStory = result.data.find((item) => item._id === String(storyID.id));
          setStory(fetchedStory);
        }
      } catch (error){
        alert(error);
      }
    };

    fetchStory();
  }, [storyID.id]);
  
  console.log(story);
  return (
    <div>
    {story && (
      <>
        <p>{story.name}</p>
        <p>{story.prompt}</p>
        <img className="w-full h-auto object-cover rounded-xl" src={story.photo} alt={prompt}/>
      </>
    )}
    </div>
  )
}

export default StoryPage