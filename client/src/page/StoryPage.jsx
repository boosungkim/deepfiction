import React from 'react'
import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";

const StoryPage = () => {
  const storyID = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try{
        const response = await fetch('https://deepfiction.onrender.com/api/v1/story',{
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
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      {story && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold mb-4">{story.prompt}</h2>
          <p className="text-lg mb-4">User: {story.name}</p>
          <img className="w-full h-auto object-cover rounded-xl mb-4" src={story.photo} alt={story.prompt} />
          {story.story.map((paragraph, index) => (
            <p key={index} className="text-lg mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default StoryPage