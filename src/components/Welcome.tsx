import React, { useState, useEffect } from 'react';
import './Welcome.css';
import Navbar from './Navbar';
import usa from './assets/united-states.png'
import french from './assets/france.png'
import arabic from './assets/morocco.png'
import korean from './assets/south-korea.png'
import spanish from './assets/spain.png'

import pythonIcon from './assets/python.png'
import reactIcon from './assets/atom.png'
import csharpIcon from './assets/c-sharp.png'
import databaseIcon from './assets/database.png'
import gitIcon from './assets/git.png'
import javaIcon from './assets/java.png'
import ProjectList from './ProjectList';




const Welcome: React.FC = (): JSX.Element => {
  const createMatrixColumns = () => {
    const columns = [];
    for (let i = 0; i < 30; i++) {
      const randomLetters = Array.from({ length: 20 }, () =>
        String.fromCharCode(0xac00 + Math.random() * (0xd7a3 - 0xac00))
      ).join('');
      columns.push(
        <div
          key={i}
          className="matrixColumn"
          style={{
            left: `${i * 3.5}%`,
            '--delay': Math.random(),
          } as React.CSSProperties}
        >
          {randomLetters.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      );
    }
    return columns;
  };

    const [,setIsHaitham] = useState<boolean>(false);


  useEffect(() => {
    const fetchUserRoles = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('No access token found');
        setIsHaitham(false);
        return;
      }

      try {
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || [];

        setIsHaitham(roles.includes('Haitham'));
      } catch (err) {
        console.error('Error decoding user roles:', err);
        setIsHaitham(false);
      }
    };

    fetchUserRoles();
  }, []);

  const [matrixColumns, setMatrixColumns] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setMatrixColumns(createMatrixColumns());
  }, []);

  const butterflyCount = 10;

  return (
    <div>
      <div id="home" className="welcomePage">
        <div className="matrixRain">{matrixColumns}</div>
        <Navbar/>
        <div className="welcomeText">
          <h1>Hello World, I'm Haitham</h1>
          <br />
        </div>
        {[...Array(butterflyCount)].map((_, index) => (
          <div
            className="butterfly"
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}

<div id="bio" className="section">
  <div className="aboutMeContainer">
    <div className="photoWrapper">
      <img
        src="https://media.licdn.com/dms/image/v2/D5603AQGzUIoZ5638xw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727396349341?e=1744848000&v=beta&t=hTW9On39rHDX-VLYy0jWDQ1z2RCiiTUTQnowgNeacAE"
        alt="Profile"
        className="profilePhoto"
      />
    </div>
    <div className="infoWrapper">
      <p>Hey! I'm Haitham, a student at Champlain College St-Lambert, studying Computer Science. 
        I have a strong passion for software development and UX design, and I'm highly curious about 
        AI and machine learning.

<br>
</br>
<br></br>
Outside of career and academics, I enjoy photography, cinematography, and travelling the world!</p>
    </div>

  </div>
</div>

<div id="skills-section">
  <h2>Skills</h2>
  <div className="skills-container">
    <div className="skill-item">
      <img src={javaIcon} alt="Java" className="skill-icon" />
      <span className="skill-name">Java</span>
    </div>
    <div className="skill-item">
      <img src={pythonIcon} alt="Python" className="skill-icon" />
      <span className="skill-name">Python</span>
    </div>
    <div className="skill-item">
      <img src={csharpIcon} alt="C#" className="skill-icon" />
      <span className="skill-name">C#</span>
    </div>
    <div className="skill-item">
      <img src={gitIcon} alt="Git" className="skill-icon" />
      <span className="skill-name">Git</span>
    </div>
    <div className="skill-item">
      <img src={reactIcon} alt="React" className="skill-icon" />
      <span className="skill-name">React</span>
    </div>
    <div className="skill-item">
      <img src={databaseIcon} alt="Databases" className="skill-icon" />
      <span className="skill-name">Databases</span>
    </div>
  </div>

  <h2>Languages</h2>
  <div className="languages-container">
    <div className="language-item">
      <img src={usa} alt="English" className="language-flag" />
      <span className="language-name">English</span>
    </div>
    <div className="language-item">
      <img src={french} alt="French" className="language-flag" />
      <span className="language-name">French</span>
    </div>
    <div className="language-item">
      <img src={spanish} alt="Spanish" className="language-flag" />
      <span className="language-name">Spanish</span>
    </div>
    <div className="language-item">
      <img src={arabic} alt="Arabic" className="language-flag" />
      <span className="language-name">Arabic</span>
    </div>
    <div className="language-item">
      <img src={korean} alt="Korean" className="language-flag" />
      <span className="language-name">Korean</span>
    </div>
  </div>
</div>

{/* Project List Section */}
<div id="projects">
<h2>Projects</h2>
          <ProjectList /> 
        </div>
        
    </div>
    </div>

  );
};

export default Welcome;
