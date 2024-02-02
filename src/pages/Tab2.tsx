// src/pages/Tab2.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar';

const Tab2: React.FC = () => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showRatings, setShowRatings] = useState<boolean>(false);

  const handleRateDay = (rating: number) => {
    setUserRating(rating);
    setShowRatings(false); // Optionally hide ratings after selection
    // Additional actions after rating...
  };

  const renderRatingButtons = () => {
    const rows = [];
    for (let row = 0; row < 2; row++) {
      const cols = [];
      for (let i = 1; i <= 5; i++) {
        const index = row * 5 + i;
        cols.push(
          <IonCol key={index}>
            <IonButton expand="block" onClick={() => handleRateDay(index)}>
              {index}
            </IonButton>
          </IonCol>
        );
      }
      rows.push(<IonRow key={row}>{cols}</IonRow>);
    }
    return <IonGrid>{rows}</IonGrid>;
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
        <CustomCalendar />
        {userRating && <p>Your rating for today is: {userRating}</p>}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
