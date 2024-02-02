import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar';
import { format } from 'date-fns';

const Tab2: React.FC = () => {
  const [dayRatings, setDayRatings] = useState<{ [key: string]: number }>({});
  const [showRatings, setShowRatings] = useState<boolean>(false);
  // Example for handling date selection, this should be replaced with actual logic
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const handleRateDay = (rating: number) => {
    setDayRatings({ ...dayRatings, [selectedDate]: rating });
    setShowRatings(false); // Optionally hide ratings after selection
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
        <CustomCalendar dayRatings={dayRatings} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
