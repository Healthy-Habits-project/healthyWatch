import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
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

  useEffect(() => {
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits));
  }, [nutritionHabits]);

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
    if (checkedCount <= 0) return 'red';
    if (checkedCount <= 1) return 'orangered';
    if (checkedCount <= 2) return 'orange';
    if (checkedCount <= 3) return 'yellow';
    if (checkedCount <= 4) return 'green';
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
          <IonTitle>Nutrition</IonTitle>
        </IonToolbar>
      </IonHeader>

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
            aria-label="Avoid Screens Before Bed"
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
            aria-label="Darkness for Sleep"
          />
          <IonLabel onClick={() => handleCheckboxChange('fastFood')}>
            Did you avoid fast food today?
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
  value={checkedCount / 4}
></IonProgressBar>

      {/* Dynamic square based on the checked count */}
      <div style={colorStyles}></div>

      <p>
        Number of checked checkboxes: {checkedCount}
      </p>
    </IonPage>
  );
};

export default NutritionPage;
