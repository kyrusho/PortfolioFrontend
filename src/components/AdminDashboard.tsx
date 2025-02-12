import React, { useState, useEffect } from 'react';
import { commentResponseModel } from '../model/commentResponseModel';
import { getPendingComments, approveComment, deleteComment } from '../axios/commentActions';
import Navbar from './Navbar';
import './AdminDashboard.css';
import { useTranslation } from 'react-i18next';

const AdminDashboard: React.FC = (): JSX.Element => {
  const [comments, setComments] = useState<commentResponseModel[]>([]);
  const [isHaitham, setIsHaitham] = useState<boolean>(false);
  const { t } = useTranslation();  // Using the translation hook

  useEffect(() => {
    const fetchUserRoles = async () => {
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

    const fetchComments = async () => {
      try {
        const response = await getPendingComments();
        setComments(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchUserRoles();
    fetchComments();
  }, []);

  const handleApprove = async (commentId: string) => {
    try {
      await approveComment(commentId);
      setComments(comments.map(c => (c.commentId === commentId ? { ...c, approved: true } : c)));
      alert(t('commentApproved'));
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.commentId !== commentId));
      alert(t('commentDeleted'));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!isHaitham) return <p>{t('accessDenied')}</p>;

  return (
    <div className="adminDashboard">
      <Navbar />
      <div className='commentsText'>
        <h1>{t('adminDashboard')}</h1>
      </div>
      <div className="commentsContainer">
        {comments.length === 0 ? (
          <p>{t('noPendingComments')}</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <p>
                <strong>{comment.author}:</strong> {comment.content}
              </p>
              <p className="commentDate">{t('submittedOn')}: {new Date(comment.dateSubmitted).toLocaleString()}</p>
              <button className="approveBtn" onClick={() => handleApprove(comment.commentId)}>
                ✔ 
              </button>
              <button className="deleteBtn" onClick={() => handleDelete(comment.commentId)}>
                ❌ 
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
