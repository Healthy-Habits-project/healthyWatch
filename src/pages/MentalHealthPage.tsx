import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonProgressBar,
  IonBackButton,
  IonButtons,
  IonContent
} from '@ionic/react';

// Import CSS file
import './SleepPage.css';

interface mentalHealthPageState {
  mindfulness: boolean;
  family: boolean;
  manageStress: boolean;
  limitScreen: boolean;
  hobby: boolean;
  feelings: boolean;
  balance: boolean;
  kindness: boolean;
}

const mentalHealthPage: React.FC = (): React.ReactElement => {
  const [mentalHealth, setmentalHealth] = useState<mentalHealthPageState>(() => {
    const storedState = localStorage.getItem('mentalHealthPageCheckboxes');
    return storedState
      ? JSON.parse(storedState)
      : {
        mindfulness: false,
        family: false,
        manageStress: false,
        limitScreen: false,
        hobby: false,
        feelings: false,
        balance: false,
        kindness: false,
        bedtimeRoutine: false,
        coolSleepEnvironment: false,
      };
  });

  useEffect(() => {
    localStorage.setItem('mentalHealthPageCheckboxes', JSON.stringify(mentalHealth));
  }, [mentalHealth]);

  const handleCheckboxChange = (key: keyof mentalHealthPageState) => {
    setmentalHealth((prevmentalHealth) => ({
      ...prevmentalHealth!,
      [key]: !prevmentalHealth![key],
    }));
  };
  

  // Function to calculate the count of checked checkboxes
  const calculateCheckedCount = () => {
    return Object.values(mentalHealth).filter((value) => value).length;
  };

  const checkedCount = calculateCheckedCount();

  // Function to determine the color based on the checkedCount
  const getColorBasedOnCount = () => {
    if (checkedCount <= 0) return '#ff0000';
    if (checkedCount <= 1) return '#f54500';
    if (checkedCount <= 2) return '#e66500';
    if (checkedCount <= 3) return '#d47d00';
    if (checkedCount <= 4) return '#bf9100';
    if (checkedCount <= 5) return '#a6a300';
    if (checkedCount <= 6) return '#8ab200';
    if (checkedCount <= 7) return '#66c000';
    if (checkedCount <= 8) return '#29cc00';
  };
  
  const color = getColorBasedOnCount();
  
  const colorStyles = {
    width: '100px', // Adjust the width as needed
    height: '100px', // Adjust the height as needed
    margin: 'auto', // Center the square horizontally
    marginTop: '20px', // Adjust the top margin as needed
    backgroundColor: color, // Apply the color variable dynamically
    borderRadius: '10px', // Adjust the border-radius as needed for rounded corners
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
          </IonButtons>
          <IonTitle>Mental Health</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
      <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.mindfulness}
            onIonChange={() => handleCheckboxChange('mindfulness')}
            aria-label="mindfulness"
          />
          <IonLabel onClick={() => handleCheckboxChange('mindfulness')}>
            Did you practice mindfulness or meditation for at least 5 minutes today?
          </IonLabel>
        </IonItem>
        
       <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.family}
            onIonChange={() => handleCheckboxChange('family')}
            aria-label="family"
          />
          <IonLabel onClick={() => handleCheckboxChange('family')}>
            Did you connect with a friend or family member for emotional support today?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.manageStress}
            onIonChange={() => handleCheckboxChange('manageStress')}
            aria-label="Managing stress"
          />
          <IonLabel onClick={() => handleCheckboxChange('manageStress')}>
            Have you taken breaks to manage stress at work or during your daily routine?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.limitScreen}
            onIonChange={() => handleCheckboxChange('limitScreen')}
            aria-label="Limiting screens"
          />
          <IonLabel onClick={() => handleCheckboxChange('limitScreen')}>
            Have you limited your screen time on electronic devices to promote a healthy mental state?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.hobby}
            onIonChange={() => handleCheckboxChange('hobby')}
            aria-label="Having a hobby"
          />
          <IonLabel onClick={() => handleCheckboxChange('hobby')}>
            Did you set aside time for a hobby or activity you enjoy for relaxation today?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.feelings}
            onIonChange={() => handleCheckboxChange('feelings')}
            aria-label="Communicating feelings"
          />
          <IonLabel onClick={() => handleCheckboxChange('feelings')}>
            Have you addressed and communicated your feelings with someone if you were experiencing distress?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.balance}
            onIonChange={() => handleCheckboxChange('balance')}
            aria-label="Having a balance"
          />
          <IonLabel onClick={() => handleCheckboxChange('balance')}>
            Have you set boundaries to ensure a healthy balance between work or responsibilities and personal time for relaxation?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={mentalHealth.kindness}
            onIonChange={() => handleCheckboxChange('kindness')}
            aria-label="Being kind"
          />
          <IonLabel onClick={() => handleCheckboxChange('kindness')}>
            Have you practiced at least one act of kindness towards yourself or others today?
          </IonLabel>
        </IonItem>


      </IonList>
      <div
  className={`color-square color-${color}`}
  style={{ marginTop: '10px', width: '50px', height: '50px' }}
></div>

<IonProgressBar
  style={{ height: '10px', marginTop: '10px' }}
  color={color}
  value={checkedCount / 8}
></IonProgressBar>


      {/* Dynamic square based on the checked count */}
      <div style={colorStyles}></div>

      <p>
        Number of checked checkboxes: {checkedCount}
      </p>
      </IonContent>
    </IonPage>
  );
};

export default mentalHealthPage;
