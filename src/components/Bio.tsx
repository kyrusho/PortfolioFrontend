import React, { useState, useEffect, useRef } from 'react';
import { meResponseModel } from '../model/meResponseModel';
import { getMe } from '../axios/getMe';
import './Bio.css'; // Link to the BIO Page CSS

const Bio: React.FC = (): JSX.Element => {
  const [meItem, setMeItem] = useState<meResponseModel[]>([]);
  const matrixContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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

    // Create matrix columns after the component mounts
    createMatrixColumns();

    // Cleanup on component unmount
    return () => {
      if (matrixContainerRef.current) {
        matrixContainerRef.current.innerHTML = ''; // Clear matrix rain when unmounting
      }
    };
  }, []);

  const createMatrixColumns = () => {
    const matrixContainer = matrixContainerRef.current;
    if (!matrixContainer) return;

    const columns = Math.floor(window.innerWidth / 20); // Adjust number of columns based on window width
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrixColumn';
      column.style.left = `${i * 20}px`;
      column.style.animationDelay = `${Math.random() * 4}s`; // Random delay for each column
      for (let j = 0; j < 20; j++) {
        const letter = document.createElement('span');
        letter.textContent = Math.random() > 0.5 ? '1' : '0'; // Random binary character for effect
        column.appendChild(letter);
      }
      matrixContainer.appendChild(column);
    }
  };

  return (
    <div className="bioPage">
      {/* Matrix Rain Effect Container */}
      <div ref={matrixContainerRef} className="matrixRain"></div>

      {/* Butterfly Animation */}
      <div className="butterfly"></div>
      <div className="butterfly"></div>
      <div className="butterfly"></div>
      <div className="butterfly"></div>
      <div className="butterfly"></div>
      <div className="butterfly"></div>

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
          <p>Loading BIO data...</p>
        )}
      </div>
    </div>
  );
};

export default Bio;
