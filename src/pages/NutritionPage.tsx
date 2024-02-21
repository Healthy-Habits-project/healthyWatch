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

import { calculateCheckedCount, handleCheckboxChange } from './functions';

import './NutritionPage.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';

interface NutritionPageState {
  calorieTarget: boolean;
  individualMeals: boolean;
  waterTarget: boolean;
  fastFood: boolean;
}

const NutritionPage: React.FC = () => {
  const [nutritionHabits, setNutritionHabits] = useState<NutritionPageState>(() => {
    const storedState = localStorage.getItem('nutritionPageCheckboxes');
    return storedState
      ? JSON.parse(storedState)
      : {
        calorieTarget: false,
        individualMeals: false,
        waterTarget: false,
        fastFood: false,
      };
  });

  const { setNutritionCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(nutritionHabits);
    setNutritionCheckedCount(newCheckedCount);
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits)); // Optionally, persist the nutritionHabits state in localStorage
  }, [nutritionHabits, setNutritionCheckedCount]);

  const checkedCount = calculateCheckedCount(nutritionHabits);

  // Function to determine the color based on the checkedCount
  const getColorBasedOnCount = () => {
    if (checkedCount <= 0) return '#fa0000';
    if (checkedCount <= 1) return '#f26c00';
    if (checkedCount <= 2) return '#d5a500';
    if (checkedCount <= 3) return '#a0d500';
    if (checkedCount <= 4) return '#00ff00';
  };
  
  const color = getColorBasedOnCount();
  
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton/></IonButtons>
          <IonTitle>Nutrition</IonTitle>
          <IonProgressBar
            className={`progress-bar-custom color-${color}`}
            style={{
              '--dynamic-progress-color': getColorBasedOnCount(),
              height: '0.5rem'
            }}
            value={calculateCheckedCount(nutritionHabits) / Object.keys(nutritionHabits).length}
          ></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
        <IonList>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.calorieTarget}
              onIonChange={() => handleCheckboxChange('calorieTarget', nutritionHabits, setNutritionHabits)}
              aria-label="Calorie Target"
            />
            <IonLabel onClick={() => handleCheckboxChange('calorieTarget', nutritionHabits, setNutritionHabits)}>
              Did you meet your calorie target today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.individualMeals}
              onIonChange={() => handleCheckboxChange('individualMeals', nutritionHabits, setNutritionHabits)}
              aria-label="Individual Meals"
            />
            <IonLabel onClick={() => handleCheckboxChange('individualMeals', nutritionHabits, setNutritionHabits)}>
              Did you eat individual meals today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.waterTarget}
              onIonChange={() => handleCheckboxChange('waterTarget', nutritionHabits, setNutritionHabits)}
              aria-label="Water Target"
            />
            <IonLabel onClick={() => handleCheckboxChange('waterTarget', nutritionHabits, setNutritionHabits)}>
              Did you drink enough water today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.fastFood}
              onIonChange={() => handleCheckboxChange('fastFood', nutritionHabits, setNutritionHabits)}
              aria-label="Fast Food Consumption"
            />
            <IonLabel onClick={() => handleCheckboxChange('fastFood', nutritionHabits, setNutritionHabits)}>
              Did you avoid fast food today?
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

export default NutritionPage;
