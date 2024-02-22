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
    const newCheckedCount = calculateCheckedCount(sleepHabits);
    setSleepCheckedCount(newCheckedCount);
    localStorage.setItem('sleepPageCheckboxes', JSON.stringify(sleepHabits)); // Optionally, persist the sleepHabits state in localStorage
  }, [sleepHabits, setSleepCheckedCount]);

  const checkedCount = calculateCheckedCount(sleepHabits);
  const totalCheckboxes = Object.keys(sleepHabits).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton/></IonButtons>
          <IonTitle>Sleep</IonTitle>
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
              checked={sleepHabits.consistentBedtime}
              onIonChange={() => handleCheckboxChange('consistentBedtime', sleepHabits, setSleepHabits)}
              aria-label="Consistent Bedtime"
            />
            <IonLabel onClick={() => handleCheckboxChange('consistentBedtime', sleepHabits, setSleepHabits)}>
              Do you have a consistent bedtime?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.restfulSleep}
              onIonChange={() => handleCheckboxChange('restfulSleep', sleepHabits, setSleepHabits)}
              aria-label="Restful Sleep"
            />
            <IonLabel onClick={() => handleCheckboxChange('restfulSleep', sleepHabits, setSleepHabits)}>
              Did you experience restful sleep?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.avoidScreensBeforeBed}
              onIonChange={() => handleCheckboxChange('avoidScreensBeforeBed', sleepHabits, setSleepHabits)}
              aria-label="Avoid Screens Before Bed"
            />
            <IonLabel onClick={() => handleCheckboxChange('avoidScreensBeforeBed', sleepHabits, setSleepHabits)}>
              Did you avoid screens before bedtime?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.darkRoom}
              onIonChange={() => handleCheckboxChange('darkRoom', sleepHabits, setSleepHabits)}
              aria-label="Darkness for Sleep"
            />
            <IonLabel onClick={() => handleCheckboxChange('darkRoom', sleepHabits, setSleepHabits)}>
              Was your room dark for sleep?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.comfortableMattress}
              onIonChange={() => handleCheckboxChange('comfortableMattress', sleepHabits, setSleepHabits)}
              aria-label="Comfortable Mattress"
            />
            <IonLabel onClick={() => handleCheckboxChange('comfortableMattress', sleepHabits, setSleepHabits)}>
              Did you sleep on a comfortable mattress?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.quietEnvironment}
              onIonChange={() => handleCheckboxChange('quietEnvironment', sleepHabits, setSleepHabits)}
              aria-label="Comfortable Mattress"
            />
            <IonLabel onClick={() => handleCheckboxChange('quietEnvironment', sleepHabits, setSleepHabits)}>
              Was your sleep environment quiet?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.consistentWakeUpTime}
              onIonChange={() => handleCheckboxChange('consistentWakeUpTime', sleepHabits, setSleepHabits)}
              aria-label="Consistent Wake Up"
            />
            <IonLabel onClick={() => handleCheckboxChange('consistentWakeUpTime', sleepHabits, setSleepHabits)}>
              Did you wake up on time?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.limitCaffeineIntake}
              onIonChange={() => handleCheckboxChange('limitCaffeineIntake', sleepHabits, setSleepHabits)}
              aria-label="Limit Caffeine"
            />
            <IonLabel onClick={() => handleCheckboxChange('limitCaffeineIntake', sleepHabits, setSleepHabits)}>
              Did you limit caffeine intake?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.bedtimeRoutine}
              onIonChange={() => handleCheckboxChange('bedtimeRoutine', sleepHabits, setSleepHabits)}
              aria-label="Bedtime Routine"
            />
            <IonLabel onClick={() => handleCheckboxChange('bedtimeRoutine', sleepHabits, setSleepHabits)}>
              Did you have a routine before bedtime?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.coolSleepEnvironment}
              onIonChange={() => handleCheckboxChange('coolSleepEnvironment', sleepHabits, setSleepHabits)}
              aria-label="Cool Sleep Environment"
            />
            <IonLabel onClick={() => handleCheckboxChange('coolSleepEnvironment', sleepHabits, setSleepHabits)}>
              Did you sleep in a cool environment?
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
      </IonContent>
    </IonPage>
  );
};

export default SleepPage;
