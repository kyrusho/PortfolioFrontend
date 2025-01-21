import React, { useState, useEffect } from 'react';
import { meResponseModel } from '../model/meResponseModel';
import { getMe } from '../axios/getMe';
import './Home.css'; // Import the CSS file for styling

const Home: React.FC = (): JSX.Element => {
  const [meItem, setMeItem] = useState<meResponseModel[]>([]);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Welcome to My Portfolio';

  useEffect(() => {
    // Fetch data for the BIO section
    const fetchMeData = async (): Promise<void> => {
      try {
        const response = await getMe();
        if (Array.isArray(response)) {
          setMeItem(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching me items:', error);
      }
    };

    fetchMeData().catch((error) => console.error('Error in fetchMeData:', error));

    // Typing effect logic
    let typedLength = 0;
    const typingInterval = setInterval(() => {
      if (typedLength < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(typedLength));
        typedLength++;
      } else {
        clearInterval(typingInterval); // Stop typing when complete
      }
    }, 150);

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, []);

  const createMatrixColumns = () => {
    const columns = [];
    for (let i = 0; i < 30; i++) {
      const randomLetters = Array.from({ length: 20 }, () =>
        String.fromCharCode(0xAC00 + Math.random() * (0xD7A3 - 0xAC00))
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

  return (
    <main className="homePage">
      {/* Falling Matrix Letters */}
      <div className="matrixRain">{createMatrixColumns()}</div>

      {/* Text Content with Typing Effect */}
      <div className="welcomeText">
        <h4>Welcome</h4>
        <h1 className="typing">{typedText}</h1>
        <p className="paragraph">Here is my biography:</p>
      </div>

      {/* BIO Section with Cards */}
      <section>
        <h2>BIO</h2>
        <div className="bioCardContainer">
          {meItem.length > 0 ? (
            meItem.map((item, index) => (
              <div key={index} className="bioCard">
                <h3>{item.firstname} {item.lastname}</h3>
                <p>Age: {item.age}</p>
                <p>Origins: {item.origins}</p>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
