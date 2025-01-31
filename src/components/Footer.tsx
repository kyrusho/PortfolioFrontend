import React, { useState } from 'react';
import { addComment } from '../axios/addComment';
import { commentRequestModel } from '../model/commentRequestModel';
import './Footer.css';

const Footer: React.FC = () => {
  const [author, setAuthor] = useState<string>(''); 
  const [content, setcontent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [errorcontent, setErrorcontent] = useState<string>(''); 
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false); 

  const handleCommentSubmit = async () => {
    if (!author || !content) {
      setErrorcontent('Please fill in both author and content.');
      return;
    }

    const newComment: commentRequestModel = {
      author,
      content,
    };

    try {
      setIsSubmitting(true);
      await addComment(newComment);
      setAuthor('');
      setcontent(''); 
      setErrorcontent('');
      alert('Comment submitted successfully!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setErrorcontent('There was an error submitting your comment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
        <h3>About</h3>
<p>
  Welcome to my portfolio! This full-stack monolith was built using Spring Boot and Java for the backend, MongoDB as the database, and React with TypeScript for the frontend. I hope you’ve enjoyed it and learned something about me!
</p>

        </div>
        <div className="footer-section">
          <h3>Contact Me</h3>
          <p>
            If you have any questions or feedback, feel free to reach out to me.
          </p>

       

          <button
            className="comment-button"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            {showCommentForm ? 'Cancel' : 'Leave a Comment'}
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
                onChange={(e) => setcontent(e.target.value)}
                placeholder="Your Comment"
              />
              {errorcontent && <p className="error-content">{errorcontent}</p>}
              <button
                className="comment-button"
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Leave Comment'}
              </button>
            </div>
          )}
          <br></br>          <br></br>

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
          <a href="https://www.flaticon.com/authors/pixel-perfect" target="_blank" rel="noopener noreferrer">Pixel perfect</a>,
          &nbsp;
          <a href="https://www.flaticon.com/authors/iconixar" target="_blank" rel="noopener noreferrer">Iconixar</a>,
          &nbsp;
          <a href="https://www.flaticon.com/authors/srip" target="_blank" rel="noopener noreferrer">Srip</a>, and
          &nbsp;
          <a href="https://www.flaticon.com/authors/afian-rochmah-afif" target="_blank" rel="noopener noreferrer">Afian Rochmah Afif</a>
          &nbsp;
          from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
