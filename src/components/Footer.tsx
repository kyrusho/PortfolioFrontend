import React, { useState } from 'react';
import { addComment } from '../axios/addComment';
import { commentRequestModel } from '../model/commentRequestModel';
import './Footer.css';

const Footer: React.FC = () => {
  const [author, setAuthor] = useState<string>(''); 
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [errorContent, setErrorContent] = useState<string>(''); 
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false); 

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

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Me</h3>
          <p>
            If you have any questions or feedback, feel free to reach out to me.
          </p>

          <button
            className="comment-button"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
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
              <button
                className="comment-button"
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Leave Comment'}
              </button>
            </div>
          )}

          <p>
            <a href="mailto:jshn2004@hotmail.com" className="email-link">
              📧 Send me an email
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h3>Follow Me</h3>
          <p>Stay connected with me on social media:</p>
          <div className="socialLinks">
            <a href="https://www.linkedin.com/in/haitham-nabihi-2353a0326/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/kyrusho" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.youtube.com/@HaiiVlogs" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Download My Resume</h3>
          <p>Download my professional resume in bot English and French.</p>
          <a href="haithamCV.pdf" download="Haitham_Nabihi_CV_EN.pdf" className="download-button">
            EN
          </a>
          &nbsp; &nbsp;
          <a href="haithamNabihiCVFrancais.pdf" download="Haitham_Nabihi_CV_FR.pdf" className="download-button">
            FR
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Haitham Nabihi. All rights reserved.</p>
        <p>
          Icons made by &nbsp;
          <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer">Freepik</a>,
          &nbsp;
          <a href="https://www.flaticon.com/authors/pixel-perfect" target="_blank" rel="noopener noreferrer">Pixel perfect</a> from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
