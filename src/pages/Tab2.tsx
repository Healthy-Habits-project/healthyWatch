import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar';
import { format } from 'date-fns';

const Tab2: React.FC = () => {
  const [dayRatings, setDayRatings] = useState<{ [key: string]: number }>({});
  const [showRatings, setShowRatings] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd")); // New state for selected date

  useEffect(() => {
    const storedRatings = localStorage.getItem('dayRatings');
    if (storedRatings) {
      setDayRatings(JSON.parse(storedRatings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dayRatings', JSON.stringify(dayRatings));
  }, [dayRatings]);

  const handleRateDay = (rating: number) => {
    setDayRatings(prevRatings => ({
      ...prevRatings,
      [selectedDate]: rating
    }));
    setShowRatings(false);
  };

  const renderRatingButtons = () => (
    <IonGrid>
      <IonRow>
        {Array.from({ length: 10 }, (_, i) => 1 + i).map(number => {
          const ratingColor = `hsl(${120 - (number - 1) * 12}, 100%, 50%)`; // Color gradient from red to green
          return (
            <IonCol size="6" sizeSm="4" sizeMd="2" key={number}>
              <IonButton
                expand="block"
                style={{
                  margin: '4px',
                  backgroundColor: ratingColor,
                  color: 'white',
                  '--hover-opacity': 0.9, // Using Ionic variable for hover effect
                }}
                onClick={() => handleRateDay(number)}
              >
                {number}
              </IonButton>
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rate Your Day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
    {/* Conditionally render the prompt based on showRatings state */}
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
    </IonPage>
  );
};

export default Tab2;
