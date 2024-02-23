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

const Tab1: React.FC = () => {
  const { mentalHealthCheckedCount } = useGlobalCounts();
  const { physicalHealthCheckedCount } = useGlobalCounts();
  const { nutritionCheckedCount } = useGlobalCounts();
  const { sleepCheckedCount } = useGlobalCounts();

  {/* TODO: Replace hard-coded values with values calculated from the GlobalCountsContext, somehow. */}
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
          <IonTitle className = "ion-text-center">Hello, obvious change</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Healthy Habit Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/mentalhealthpage">
                <IonCard style={{ backgroundColor: mentalColor }}>
                  <img alt="MentalHealth" src="/MentalHealthCard.png" />
                  <IonCardHeader>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/physicalhealthpage">
                <IonCard style={{ backgroundColor: physicalColor }}>
                  <img alt="PhysicalHealth" src="/PhysicalHealthCard.png" height="" />
                  <IonCardHeader>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/nutritionpage">
                <IonCard style={{ backgroundColor: nutritionColor }}>
                  <img alt="Nutrition" src="/NutritionCard.png" />
                  <IonCardHeader>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/sleeppage">
                <IonCard style={{ backgroundColor: sleepColor }}>
                  <img alt="SleepHabits" src="/SleepCard.png" />
                  <IonCardHeader>
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
