import React, { useState, useEffect } from 'react';
import { commentResponseModel } from '../model/commentResponseModel';
import { getComments } from '../axios/getComments';  // Assuming the getComments function is in getComments
import Navbar from './Navbar';
import './Comment.css';

const Comment: React.FC = (): JSX.Element => {
  const [comments, setComments] = useState<commentResponseModel[]>([]);

  useEffect(() => {
    const fetchCommentsData = async (): Promise<void> => {
      try {
        const response = await getComments();
        if (Array.isArray(response)) {
          setComments(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchCommentsData().catch((error) => console.error('Error in fetchCommentsData:', error));
  }, []);  // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="commentsPage">
      <Navbar />
      <div className="commentsText">
        <h1>Comments Page</h1>
      </div>
      <div className="commentsContainer">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <p><strong>{comment.author}:</strong> {comment.content}</p>
              <p className="commentDate">
                Submitted on: {new Date(comment.dateSubmitted).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>Loading comments...</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
