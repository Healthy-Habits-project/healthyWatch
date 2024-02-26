import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { calculateCheckedCount, getColorBasedOnCount, handleCheckboxChange } from './functions';

import './SleepPage.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';

import DateTimeDisplay from '../components/GetDateTime';

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
  const [mentalHealth, setMentalHealth] = useState<mentalHealthPageState>(() => {
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
      };
  });

  const { setMentalHealthCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(mentalHealth);
    setMentalHealthCheckedCount(newCheckedCount);
    localStorage.setItem('mentalHealthPageCheckboxes', JSON.stringify(mentalHealth)); // Optionally, persist the mentalHealth state in localStorage
  }, [mentalHealth, setMentalHealthCheckedCount]);

  const checkedCount = calculateCheckedCount(mentalHealth);
  const totalCheckboxes = Object.keys(mentalHealth).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);
  
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton/></IonButtons>
          <IonTitle>Mental</IonTitle>
          <IonProgressBar
            className={`progress-bar-custom color-${color}`}
            style={{
              '--dynamic-progress-color': color,
              height: '0.5rem'
            }}
            value={checkedCount / totalCheckboxes}
          ></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
        <IonList>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.mindfulness}
              onIonChange={() => handleCheckboxChange('mindfulness', mentalHealth, setMentalHealth)}
              aria-label="mindfulness"
            />
            <IonLabel onClick={() => handleCheckboxChange('mindfulness', mentalHealth, setMentalHealth)}>
              Did you practice mindfulness or meditation for at least 5 minutes today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.family}
              onIonChange={() => handleCheckboxChange('family', mentalHealth, setMentalHealth)}
              aria-label="family"
            />
            <IonLabel onClick={() => handleCheckboxChange('family', mentalHealth, setMentalHealth)}>
              Did you connect with a friend or family member for emotional support today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.manageStress}
              onIonChange={() => handleCheckboxChange('manageStress', mentalHealth, setMentalHealth)}
              aria-label="Managing stress"
            />
            <IonLabel onClick={() => handleCheckboxChange('manageStress', mentalHealth, setMentalHealth)}>
              Have you taken breaks to manage stress at work or during your daily routine?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.limitScreen}
              onIonChange={() => handleCheckboxChange('limitScreen', mentalHealth, setMentalHealth)}
              aria-label="Limiting screens"
            />
            <IonLabel onClick={() => handleCheckboxChange('limitScreen', mentalHealth, setMentalHealth)}>
              Have you limited your screen time on electronic devices to promote a healthy mental state?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.hobby}
              onIonChange={() => handleCheckboxChange('hobby', mentalHealth, setMentalHealth)}
              aria-label="Having a hobby"
            />
            <IonLabel onClick={() => handleCheckboxChange('hobby', mentalHealth, setMentalHealth)}>
              Did you set aside time for a hobby or activity you enjoy for relaxation today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.feelings}
              onIonChange={() => handleCheckboxChange('feelings', mentalHealth, setMentalHealth)}
              aria-label="Communicating feelings"
            />
            <IonLabel onClick={() => handleCheckboxChange('feelings', mentalHealth, setMentalHealth)}>
              Have you addressed and communicated your feelings with someone if you were experiencing distress?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.balance}
              onIonChange={() => handleCheckboxChange('balance', mentalHealth, setMentalHealth)}
              aria-label="Having a balance"
            />
            <IonLabel onClick={() => handleCheckboxChange('balance', mentalHealth, setMentalHealth)}>
              Have you set boundaries to ensure a healthy balance between work or responsibilities and personal time for relaxation?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.kindness}
              onIonChange={() => handleCheckboxChange('kindness', mentalHealth, setMentalHealth)}
              aria-label="Being kind"
            />
            <IonLabel onClick={() => handleCheckboxChange('kindness', mentalHealth, setMentalHealth)}>
              Have you practiced at least one act of kindness towards yourself or others today?
            </IonLabel>
          </IonItem>

        </IonList>
        <h1>Debugging Information</h1>
        <p>
          Number of checked checkboxes: {checkedCount}
        </p>
        <p>
          Total number of checkboxes: {totalCheckboxes}
        </p>
        <p>
          Progress: {Math.round(checkedCount / totalCheckboxes * 100)}%
        </p>
        <p>
          Hex Color: {color}
        </p>
        <DateTimeDisplay />
      </IonContent>
    </IonPage>
  );
};

export default mentalHealthPage;
