import React, { useState } from 'react';
import { IonContent, IonHeader, IonGrid, IonRow, IonButton, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [name, setName] = useState(''); // State to store the user's name input

  const handleSave = () => {
    // Here you can handle the save action, for example, logging the name or saving it elsewhere
    console.log(name); // For demonstration, we'll just log the name to the console
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="Enter Name" value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonButton onClick={handleSave}>Save</IonButton>
              <IonButton>Export</IonButton>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
