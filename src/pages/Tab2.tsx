import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar';
import { format } from 'date-fns';

const Tab2: React.FC = () => {
  const [dayRatings, setDayRatings] = useState<{ [key: string]: number }>({});
  const [showRatings, setShowRatings] = useState<boolean>(false);

  // Load ratings from Local Storage on initial render
  useEffect(() => {
    const storedRatings = localStorage.getItem('dayRatings');
    if (storedRatings) {
      setDayRatings(JSON.parse(storedRatings));
    }
  }, []);

  // Update Local Storage whenever dayRatings change
  useEffect(() => {
    localStorage.setItem('dayRatings', JSON.stringify(dayRatings));
  }, [dayRatings]);

  const handleRateDay = (rating: number) => {
    const today = format(new Date(), "yyyy-MM-dd");
    setDayRatings(prevRatings => ({
      ...prevRatings,
      [today]: rating
    }));
    setShowRatings(false);
  };

  const renderRatingButtons = () => {
    return (
      <IonGrid>
        <IonRow>
          {Array.from({ length: 5 }, (_, i) => 1 + i).map(number => (
            <IonCol key={number}>
              <IonButton expand="block" onClick={() => handleRateDay(number)}>
                {number}
              </IonButton>
            </IonCol>
          ))}
        </IonRow>
        <IonRow>
          {Array.from({ length: 5 }, (_, i) => 6 + i).map(number => (
            <IonCol key={number}>
              <IonButton expand="block" onClick={() => handleRateDay(number)}>
                {number}
              </IonButton>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    );
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rate Your Day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => setShowRatings(!showRatings)}>How do you rate your day?</IonButton>
        {showRatings && renderRatingButtons()}
        <CustomCalendar dayRatings={dayRatings} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

