import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import './Travel.css'; // Import your Travel CSS

// Define the type for a destination
interface Destination {
  [x: string]: string | undefined;
  title: string;
  description: string;
  image: string; // Add image property
}

// Define the type for the destinations object
interface Destinations {
  [key: string]: Destination;
}

const Travel: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  // Get all destinations from the translation file and explicitly type them
  const destinations = t('travelPage.destinations', { returnObjects: true }) as Destinations;

  return (
    <div className="travelPage">
      <Navbar />
      <div className="welcomeText">
        <h1>{t('travelPage.title')}</h1>
      </div>

      {/* Render each destination */}
      {Object.keys(destinations).map((key, index) => {
        const destination = destinations[key];
        const isEven = index % 2 === 0;

        return (
          <div className={`travelSection ${isEven ? 'row-reverse' : ''}`} key={key}>
            <img className="travelImage" src={destination.image} alt={destination.title} />
            <div className="travelText">
              <h2>{destination.title}</h2>
              <p>{destination.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Travel;
