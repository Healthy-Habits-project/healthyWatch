// src/pages/Tab2.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar';

const Tab2: React.FC = () => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showRatings, setShowRatings] = useState<boolean>(false);

  const handleRateDay = (rating: number) => {
    setUserRating(rating);
    setShowRatings(false); // Hide ratings after selection
    // Additional actions after rating...
  };

  const renderRatingButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      buttons.push(
        <IonItem key={i}>
          <IonButton expand="block" onClick={() => handleRateDay(i)}>
            {i}
          </IonButton>
        </IonItem>
      );
    }
    return buttons;
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
        {showRatings && <IonList>{renderRatingButtons()}</IonList>}
        <CustomCalendar />
        {userRating && <p>Your rating for today is: {userRating}</p>}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
