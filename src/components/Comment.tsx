import React, { useState, useEffect } from 'react';
import { commentResponseModel } from '../model/commentResponseModel';
import Navbar from './Navbar';
import './Comment.css';
import { commentRequestModel } from '../model/commentRequestModel';
import { addComment } from '../axios/addComment';
import { getApprovedComments } from '../axios/getComments';
import { deleteComment } from '../axios/commentActions';

const Comment: React.FC = (): JSX.Element => {
  const [comments, setComments] = useState<commentResponseModel[]>([]);
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string>('');
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [isHaitham, setIsHaitham] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRoles = () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return;

      try {
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || [];
        setIsHaitham(roles.includes('Haitham'));
      } catch (err) {
        console.error('Error decoding roles:', err);
      }
    };

    const fetchCommentsData = async () => {
      try {
        const response = await getApprovedComments();
        setComments(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchUserRoles();
    fetchCommentsData();
  }, []);

  const handleCommentSubmit = async () => {
    if (!author || !content) {
      setErrorContent('Please fill in both author and content.');
      return;
    }

    const newComment: commentRequestModel = { author, content };

    try {
      setIsSubmitting(true);
      await addComment(newComment);
      setAuthor('');
      setContent('');
      setErrorContent('');
      alert('Comment submitted successfully! Awaiting approval.');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setErrorContent('There was an error submitting your comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.commentId !== commentId));
      alert('Comment deleted!');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="commentsPage">
      <Navbar />
      <div className="commentsText">
        <h1>Comments</h1>
      </div>
      <button className="comment-button" onClick={() => setShowCommentForm(!showCommentForm)}>
        {showCommentForm ? 'Close' : 'Leave a Comment'}
      </button>

      {showCommentForm && (
        <div className="comment-form">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your Name"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your Comment"
          />
          {errorContent && <p className="error-content">{errorContent}</p>}
          <button className="comment-button" onClick={handleCommentSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Leave Comment'}
          </button>
        </div>
      )}

      <div className="commentsContainer">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <p>
                <strong>{comment.author}:</strong> {comment.content}
              </p>
              <p className="commentDate">
                Submitted on: {new Date(comment.dateSubmitted).toLocaleString()}
              </p>

              {isHaitham && (
                <>
                  <button className="deleteBtn" onClick={() => handleDelete(comment.commentId)}>
                    ❌ 
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
