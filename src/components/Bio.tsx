import React, { useState, useEffect } from 'react';
import { meResponseModel } from '../model/meResponseModel';
import { getMe } from '../axios/getMe';
import './Bio.css'; // Link to the BIO Page CSS

const Bio: React.FC = (): JSX.Element => {
  const [meItem, setMeItem] = useState<meResponseModel[]>([]);

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

  }, []);

 

  return (
    <div className="bioPage">
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
