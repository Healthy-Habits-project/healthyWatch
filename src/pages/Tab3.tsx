import React, { useState } from 'react';
import { IonContent, IonHeader, IonGrid, IonRow, IonButton, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system'); // State for theme selection

  const handleSave = () => {
    console.log(name);
    // Save settings here
  };

  const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    // Implement theme change logic here, for example, by updating a global state or applying a class to the body
  };

  const resetAppData = () => {
    // Implement reset logic here, such as clearing local storage or resetting global state
    console.log('App data reset');
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
          <IonItem>
            <IonLabel>Theme</IonLabel>
            <IonSelect value={theme} placeholder="Select One" onIonChange={e => handleThemeChange(e.detail.value)}>
              <IonSelectOption value="light">Light</IonSelectOption>
              <IonSelectOption value="dark">Dark</IonSelectOption>
              <IonSelectOption value="system">System</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonButton onClick={handleSave}>Save</IonButton>
              <IonButton onClick={resetAppData}>Reset App Data</IonButton>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
