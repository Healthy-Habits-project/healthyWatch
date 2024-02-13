// SleepPage.tsx
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
import { useGlobalCounts } from '../contexts/GlobalCountsContext';

interface SleepPageState {
  consistentBedtime: boolean;
  restfulSleep: boolean;
  avoidScreensBeforeBed: boolean;
  darkRoom: boolean;
  comfortableMattress: boolean;
  quietEnvironment: boolean;
  consistentWakeUpTime: boolean;
  limitCaffeineIntake: boolean;
  bedtimeRoutine: boolean;
  coolSleepEnvironment: boolean;
}

const SleepPage: React.FC = () => {
  const [sleepHabits, setSleepHabits] = useState<SleepPageState>(() => {
    const storedState = localStorage.getItem('sleepPageCheckboxes');
    return storedState
      ? JSON.parse(storedState)
      : {
        consistentBedtime: false,
        restfulSleep: false,
        avoidScreensBeforeBed: false,
        darkRoom: false,
        comfortableMattress: false,
        quietEnvironment: false,
        consistentWakeUpTime: false,
        limitCaffeineIntake: false,
        bedtimeRoutine: false,
        coolSleepEnvironment: false,
      };
  });

  const { setSleepCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = Object.values(sleepHabits).filter(Boolean).length;
    setSleepCheckedCount(newCheckedCount);
    // Optionally, persist the sleepHabits state in localStorage
    localStorage.setItem('sleepPageCheckboxes', JSON.stringify(sleepHabits));
  }, [sleepHabits, setSleepCheckedCount]);

  const handleCheckboxChange = (key: keyof SleepPageState) => {
    setSleepHabits((prevSleepHabits) => ({
      ...prevSleepHabits,
      [key]: !prevSleepHabits[key],
    }));
  };

  // Function to calculate the count of checked checkboxes
  const calculateCheckedCount = () => {
    return Object.values(sleepHabits).filter((value) => value).length;
  };

  const checkedCount = calculateCheckedCount();

  // Function to determine the color based on the checkedCount
  const getColorBasedOnCount = () => {
    if (checkedCount <= 0) return '#fa0000';
    if (checkedCount <= 1) return '#fa3f00';
    if (checkedCount <= 2) return '#f65e00';
    if (checkedCount <= 3) return '#ee7800';
    if (checkedCount <= 4) return '#e39000';
    if (checkedCount <= 5) return '#d5a500';
    if (checkedCount <= 6) return '#c3b900';
    if (checkedCount <= 7) return '#adcc00';
    if (checkedCount <= 8) return '#91de00';
    if (checkedCount <= 9) return '#6aef00';
    return '#00ff00';
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
          <IonTitle>Sleep Habits</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
      <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.consistentBedtime}
            onIonChange={() => handleCheckboxChange('consistentBedtime')}
            aria-label="Consistent Bedtime"
          />
          <IonLabel onClick={() => handleCheckboxChange('consistentBedtime')}>
            Do you have a consistent bedtime?
          </IonLabel>
        </IonItem>
        
       <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.restfulSleep}
            onIonChange={() => handleCheckboxChange('restfulSleep')}
            aria-label="Restful Sleep"
          />
          <IonLabel onClick={() => handleCheckboxChange('restfulSleep')}>
            Did you experience restful sleep?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.avoidScreensBeforeBed}
            onIonChange={() => handleCheckboxChange('avoidScreensBeforeBed')}
            aria-label="Avoid Screens Before Bed"
          />
          <IonLabel onClick={() => handleCheckboxChange('avoidScreensBeforeBed')}>
            Did you avoid screens before bedtime?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.darkRoom}
            onIonChange={() => handleCheckboxChange('darkRoom')}
            aria-label="Darkness for Sleep"
          />
          <IonLabel onClick={() => handleCheckboxChange('darkRoom')}>
            Was your room dark for sleep?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.comfortableMattress}
            onIonChange={() => handleCheckboxChange('comfortableMattress')}
            aria-label="Comfortable Mattress"
          />
          <IonLabel onClick={() => handleCheckboxChange('comfortableMattress')}>
            Did you sleep on a comfortable mattress?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.quietEnvironment}
            onIonChange={() => handleCheckboxChange('quietEnvironment')}
            aria-label="Comfortable Mattress"
          />
          <IonLabel onClick={() => handleCheckboxChange('quietEnvironment')}>
            Was your sleep environment quiet?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.consistentWakeUpTime}
            onIonChange={() => handleCheckboxChange('consistentWakeUpTime')}
            aria-label="Consistent Wake Up"
          />
          <IonLabel onClick={() => handleCheckboxChange('consistentWakeUpTime')}>
            Did you wake up on time?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.limitCaffeineIntake}
            onIonChange={() => handleCheckboxChange('limitCaffeineIntake')}
            aria-label="Limit Caffiene"
          />
          <IonLabel onClick={() => handleCheckboxChange('limitCaffeineIntake')}>
            Did you limit caffeine intake?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.bedtimeRoutine}
            onIonChange={() => handleCheckboxChange('bedtimeRoutine')}
            aria-label="Bedtime Routine"
          />
          <IonLabel onClick={() => handleCheckboxChange('bedtimeRoutine')}>
            Did you have a routine before bedtime?
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonCheckbox
            slot="start"
            checked={sleepHabits.coolSleepEnvironment}
            onIonChange={() => handleCheckboxChange('coolSleepEnvironment')}
            aria-label="Cool Sleep Environment"
          />
          <IonLabel onClick={() => handleCheckboxChange('coolSleepEnvironment')}>
            Did you sleep in a cool environment?
          </IonLabel>
        </IonItem>
      </IonList>

      <div
  className={`color-square color-${color}`}
  style={{ marginTop: '10px', width: '50px', height: '50px' }}
></div>





      {/* Dynamic square based on the checked count */}
      <div style={colorStyles}></div>
      <IonProgressBar
        className="progress-bar-custom"
        style={{
          '--dynamic-progress-color': getColorBasedOnCount(), // This applies the dynamic color
          height: '2rem',
          marginTop: '10px',
        }}
        value={calculateCheckedCount() / 10}
      ></IonProgressBar>
      <p>
        Number of checked checkboxes: {checkedCount}
      </p>
      </IonContent>
    </IonPage>
  );
};

export default SleepPage;
