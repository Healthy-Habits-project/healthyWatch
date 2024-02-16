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

import './PhysicalHealthPage.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';

interface PhysicalPageState {
  resistance: boolean;
  cardio: boolean;
  balance: boolean;
  steps: boolean;
  sunlight: boolean;
}

const PhysicalPage: React.FC = () => {
  const [physicalHabits, setPhysicalHabits] = useState<PhysicalPageState>(() => {
    const storedState = localStorage.getItem('physicalPageCheckboxes');
    return storedState
      ? JSON.parse(storedState)
      : {
        resistance: false,
        cardio: false,
        balance: false,
        steps: false,
        sunlight: false,
      };
  });

  const { setPhysicalHealthCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = calculateCheckedCount();
    setPhysicalHealthCheckedCount(newCheckedCount);
    localStorage.setItem('physicalPageCheckboxes', JSON.stringify(physicalHabits));
  }, [physicalHabits, setPhysicalHealthCheckedCount]);

  const handleCheckboxChange = (key: keyof PhysicalPageState) => {
    setPhysicalHabits((prevPhysicalHabits) => ({
      ...prevPhysicalHabits,
      [key]: !prevPhysicalHabits[key],
    }));
  };

  // Function to calculate the count of checked checkboxes
  const calculateCheckedCount = () => {
    return Object.values(physicalHabits).filter((value) => value).length;
  };

  const checkedCount = calculateCheckedCount();

  // Function to determine the color based on the checkedCount
  const getColorBasedOnCount = () => {
    if (checkedCount <= 0) return '#fa0000';
    if (checkedCount <= 1) return '#f65e00';
    if (checkedCount <= 2) return '#e39000';
    if (checkedCount <= 3) return '#c3b900';
    if (checkedCount <= 4) return '#91de00';
    if (checkedCount <= 5) return '#00ff00';
  };
  
  const color = getColorBasedOnCount();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'><IonBackButton/></IonButtons>
          <IonTitle>Physical</IonTitle>
          <IonProgressBar
            className={`progress-bar-custom color-${color}`}
            style={{
              '--dynamic-progress-color': getColorBasedOnCount(),
              height: '0.5rem'
            }}
            value={calculateCheckedCount() / 5}
          ></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
        <IonItem>
          <IonLabel>
            <h2>Keep track of your physical activities below!</h2>
          </IonLabel>
        </IonItem>
        <IonList>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.resistance}
              onIonChange={() => handleCheckboxChange('resistance')}
              aria-label="Resistance Training"
            />
            <IonLabel onClick={() => handleCheckboxChange('resistance')}>
              Did you meet your resistance training goal today?
            </IonLabel>
          </IonItem>
        
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.cardio}
              onIonChange={() => handleCheckboxChange('cardio')}
              aria-label="Cardiovascular Training"
            />
            <IonLabel onClick={() => handleCheckboxChange('cardio')}>
              Did you meet your cardiovascular training goal today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.balance}
              onIonChange={() => handleCheckboxChange('balance')}
              aria-label="Balance Training"
            />
            <IonLabel onClick={() => handleCheckboxChange('balance')}>
              Did you meet your balance training goal today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.steps}
              onIonChange={() => handleCheckboxChange('steps')}
              aria-label="Steps"
            />
            <IonLabel onClick={() => handleCheckboxChange('steps')}>
              Did you walk at least 10,000 steps today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.sunlight}
              onIonChange={() => handleCheckboxChange('sunlight')}
              aria-label="Sunlight"
            />
            <IonLabel onClick={() => handleCheckboxChange('sunlight')}>
              Did you get at least 30 minutes of sunlight today?
            </IonLabel>
          </IonItem>
        </IonList>
        <p>
          Number of checked checkboxes: {checkedCount}
        </p>
      </IonContent>
    </IonPage>
  );
};

export default PhysicalPage;
