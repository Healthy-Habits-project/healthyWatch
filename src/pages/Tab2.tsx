import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar'; // Make sure this path is correct
import { format } from 'date-fns';
import badgeImage from '/badges/badge1.png'; // Ensure this path points to your badge image
import { useGlobalCounts } from '../contexts/GlobalCountsContext';

const Tab2: React.FC = () => {
  const [dayRatings, setDayRatings] = useState<{ [key: string]: number }>({});
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [showRatings, setShowRatings] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const { mentalHealthCheckedCount } = useGlobalCounts();
  const { physicalHealthCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const storedRatings = localStorage.getItem('dayRatings');
    const storedBadgeCount = localStorage.getItem('badgeCount');
    if (storedRatings) {
      setDayRatings(JSON.parse(storedRatings));
    }
    if (storedBadgeCount) {
      setBadgeCount(JSON.parse(storedBadgeCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dayRatings', JSON.stringify(dayRatings));
  }, [dayRatings]);

  useEffect(() => {
    localStorage.setItem('badgeCount', JSON.stringify(badgeCount));
  }, [badgeCount]);

  const handleRateDay = (rating: number) => {
    const updatedRatings = { ...dayRatings, [selectedDate]: rating };
    setDayRatings(updatedRatings);

    const highRatedDaysCount = Object.values(updatedRatings).filter(rating => rating >= 7).length;
    // Adjust this logic if you want the badge awarded at different milestones
    if (highRatedDaysCount % 5 === 0 && highRatedDaysCount > 0) {
      setBadgeCount(prevCount => prevCount + 1);
    }
    setShowRatings(false);
  };

  const renderRatingButtons = () => (
    <IonGrid>
      <IonRow>
        {Array.from({ length: 10 }, (_, i) => 1 + i).map(number => (
          <IonCol size="6" sizeSm="4" sizeMd="2" key={number}>
            <IonButton
              expand="block"
              style={{
                margin: '4px',
                backgroundColor: `hsl(${120 - (number - 1) * 12}, 100%, 50%)`, // Gradient from red to green
                color: 'white',
                '--hover-opacity': 0.9,
              }}
              onClick={() => handleRateDay(number)}
            >
              {number}
            </IonButton>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rate Your Day</IonTitle>
          <div className="abitofspace">
          <p>Mental Health Checked Count: {mentalHealthCheckedCount}</p>
          <p>Physical Health Checked Count: {physicalHealthCheckedCount}</p>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!showRatings && (
          <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>
            Click a day on the calendar to rate your day.
          </div>
        )}
        {showRatings && renderRatingButtons()}
        <CustomCalendar
          dayRatings={dayRatings}
          onDaySelect={(date: string) => {
            setSelectedDate(date);
            setShowRatings(true);
          }}
        />
     
      </IonContent>
      {/* Displaying badges at the bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '20px', background: 'black', color: 'white', borderTop: '1px solid #ccc', zIndex: 1000 }}>
        {badgeCount > 0 && (
          <>
            <IonImg src={badgeImage} style={{ width: '50px', height: '50px' }} />
            <div style={{ marginTop: '10px' }}>You've earned {badgeCount} {badgeCount === 1 ? 'badge' : 'badges'} for positivity!</div>
          </>
        )}
      </div>
    </IonPage>
  );
};

export default Tab2;




