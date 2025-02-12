import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addComment } from '../axios/addComment';
import { commentRequestModel } from '../model/commentRequestModel';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [author, setAuthor] = useState<string>(''); 
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [errorContent, setErrorContent] = useState<string>(''); 
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false); 

  const handleCommentSubmit = async () => {
      if (!author || !content) {
        setErrorContent(t('footer.leaveComment.error'));
        return;
      }
  
      const newComment: commentRequestModel = { author, content };
  
      try {
        setIsSubmitting(true);
        await addComment(newComment);
        setAuthor('');
        setContent('');
        setErrorContent('');
        alert(t('footer.leaveComment.submitSuccess'));
      } catch (error) {
        console.error('Error submitting comment:', error);
        setErrorContent(t('footer.leaveComment.submitError'));
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{t('footer.contactTitle')}</h3>
          <p>{t('footer.contactDescription')}</p>

          <button
            className="comment-button"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            {showCommentForm ? t('footer.leaveComment.closeForm') : t('footer.leaveComment.openForm')}
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
                {isSubmitting ? 'Submitting...' : t('footer.leaveComment.openForm')}
              </button>
            </div>
          )}

          <p>
            <a href="mailto:jshn2004@hotmail.com" className="email-link">
              📧 {t('footer.contactTitle')}
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h3>{t('footer.followMe')}</h3>
          <p>{t('footer.stayConnected')}</p>
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
          <h3>{t('footer.downloadResume')}</h3>
          <p>{t('footer.resumeDescription')}</p>
          <a href="haithamCV.pdf" download="Haitham_Nabihi_CV_EN.pdf" className="download-button">
            {t('footer.resumeEN')}
          </a>
          &nbsp; &nbsp;
          <a href="haithamNabihiCVFrancais.pdf" download="Haitham_Nabihi_CV_FR.pdf" className="download-button">
            {t('footer.resumeFR')}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer.rightsReserved')}</p>
        <p>
          {t('footer.iconsMadeBy')} &nbsp;
          <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer">Freepik</a>,
          &nbsp;
          <a href="https://www.flaticon.com/authors/pixel-perfect" target="_blank" rel="noopener noreferrer">Pixel perfect</a> {t('footer.onFlaticon')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
