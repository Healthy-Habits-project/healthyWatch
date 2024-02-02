import React, { useState } from 'react';
import { IonDatetime, IonLabel, IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './Tab2.css';
function Example() {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (event: CustomEvent) => {
    // Assuming the selected date is in the format YYYY-MM-DDTHH:mm
    const selectedDateTime = new Date(event.detail.value as string);
    const formattedDate = selectedDateTime.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    setSelectedDate(formattedDate);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Date and Time Picker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel>Select a Date and Time:</IonLabel>
        <IonDatetime
          value={selectedDate}
          onIonChange={handleDateChange}
        />
      </IonContent>
    </IonPage>
  );
}

export default Example;
