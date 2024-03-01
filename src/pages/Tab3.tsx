import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Tab3.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const Tab3: React.FC = () => {
  const [name, setName] = useState('');
  const { userName, setUserName } = useUser(); // Destructure the context object

  const handleSave = () => {
    console.log('LOG: Saving app data, set name to:', name);
    setUserName(", " + name);
    setUserName(", " + name);
  };

  const handleThemeChange = (selectedTheme: string) => {
    document.body.classList.remove('ion-color-light', 'ion-color-dark');
    document.body.classList.add(selectedTheme);
  };

  const resetAppData = () => {
    console.log('LOG: Handling reset app data');
  };

  const exportAppData = () => {
    console.log('LOG: Handling export app data');
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
            <IonInput
              placeholder="Enter Name"
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Theme</IonLabel>
            <IonSelect
              placeholder="Default"
              onIonChange={(e: CustomEvent) => handleThemeChange(e.detail.value as string)}>
              <IonSelectOption value="ion-color-light">Light</IonSelectOption>
              <IonSelectOption value="ion-color-dark">Dark</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonButton onClick={handleSave}>Save</IonButton>
              <IonButton onClick={exportAppData}>Export Data</IonButton>
              <IonButton onClick={resetAppData}>Reset Data</IonButton>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
