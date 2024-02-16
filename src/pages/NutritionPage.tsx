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

  const { nutritionCheckedCount, setNutritionCheckedCount } = useGlobalCounts();
  

  useEffect(() => {
    const newCheckedCount = Object.values(nutritionHabits).filter(Boolean).length;
    setNutritionCheckedCount(newCheckedCount);
    // Optionally, persist the nutritionHabits state in localStorage
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits));
  }, [nutritionHabits, setNutritionCheckedCount]);

  const handleCheckboxChange = (key: keyof NutritionPageState) => {
    setNutritionHabits((prevNutritionHabits) => ({
      ...prevNutritionHabits,
      [key]: !prevNutritionHabits[key],
    }));
  };

  // Function to calculate the count of checked checkboxes
  const calculateCheckedCount = () => {
    return Object.values(nutritionHabits).filter((value) => value).length;
  };

  const checkedCount = calculateCheckedCount();

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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Nutrition</IonTitle>
          <IonProgressBar
            className={`progress-bar-custom color-${color}`}
            style={{
              '--dynamic-progress-color': getColorBasedOnCount(),
              height: '0.5rem'
            }}
            value={calculateCheckedCount() / 4}
          ></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.calorieTarget}
              onIonChange={() => handleCheckboxChange('calorieTarget')}
              aria-label="Calorie Target"
            />
            <IonLabel onClick={() => handleCheckboxChange('calorieTarget')}>
              Did you meet your calorie target today?
            </IonLabel>
          </IonItem>
        
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.individualMeals}
              onIonChange={() => handleCheckboxChange('individualMeals')}
              aria-label="Individual Meals"
            />
            <IonLabel onClick={() => handleCheckboxChange('individualMeals')}>
              Did you eat individual meals today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.waterTarget}
              onIonChange={() => handleCheckboxChange('waterTarget')}
              aria-label="Water Target"
            />
            <IonLabel onClick={() => handleCheckboxChange('waterTarget')}>
              Did you drink enough water today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.fastFood}
              onIonChange={() => handleCheckboxChange('fastFood')}
              aria-label="Fast Food Consumption"
            />
            <IonLabel onClick={() => handleCheckboxChange('fastFood')}>
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
