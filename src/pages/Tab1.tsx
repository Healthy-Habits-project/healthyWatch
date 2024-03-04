// Tab1.tsx
import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { getColorBasedOnCount } from './functions';

import './Tab1.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const Tab1: React.FC = () => {
  const { mentalHealthCheckedCount } = useGlobalCounts();
  const { physicalHealthCheckedCount } = useGlobalCounts();
  const { nutritionCheckedCount } = useGlobalCounts();
  const { sleepCheckedCount } = useGlobalCounts();
  const { userName } = useUser(); // Destructure the context object

  // TODO: Replace hard-coded values with values calculated from the GlobalCountsContext, somehow.
  const totalPhysicalCheckboxes = 6;
  const totalMentalCheckboxes = 8;
  const totalNutritionCheckboxes = 4;
  const totalSleepCheckboxes = 10;

  const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes);
  const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes);
  const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes);
  const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle className="ion-text-center">{`Hello ${userName}`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonHeader class="mediumHeader">Healthy Habit Tracker</IonHeader>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/mentalhealthpage">
                <IonCard style={{ backgroundColor: mentalColor }}>
                  <img alt="MentalHealth" src="/MentalHealthCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#ebc2ff" }}>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/physicalhealthpage">
                <IonCard style={{ backgroundColor: physicalColor }}>
                  <img alt="PhysicalHealth" src="/PhysicalHealthCard.png" height="" />
                  <IonCardHeader style={{ backgroundColor: "#a873e8" }}>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/nutritionpage">
                <IonCard style={{ backgroundColor: nutritionColor }}>
                  <img alt="Nutrition" src="/NutritionCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#56d1dc" }}>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/sleeppage">
                <IonCard style={{ backgroundColor: sleepColor }}>
                  <img alt="SleepHabits" src="/SleepCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#5d7bd5" }}>
                    <IonCardTitle>Sleep</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
