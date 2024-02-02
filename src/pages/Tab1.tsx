import React from 'react';
import {
  IonContent,
  IonHeader,
  IonCol,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonGrid,
  IonRow,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonImg,
  IonCardSubtitle,
  IonText,
  IonRouterLink,
  IonChip,
  IonAvatar,
  IonLabel,
  IonInput,
  IonIcon,
  IonNote,
  IonFabButton,
  IonFabList,
  IonFab
} from '@ionic/react';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { ellipse, square, triangle, cog } from 'ionicons/icons';
import { IonSelect, IonSelectOption } from '@ionic/react';

const Tab1: React.FC = () => {

  const options = [
    { value: 1, label: 'Terrible' },
    { value: 2, label: 'Bad' },
    { value: 3, label: 'Poor' },
    { value: 4, label: 'Could be Better' },
    { value: 5, label: 'Okay' },
    { value: 6, label: 'Pretty Good' },
    { value: 7, label: 'Very Good' },
    { value: 8, label: 'Great' },
    { value: 9, label: 'Amazing' },
    { value: 10, label: 'The Best!' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className = "ion-text-center">Hello, [NAME]</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Healthy Habit Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab slot="fixed" vertical="center" horizontal="start">
          <IonFabButton>
            <IonIcon icon={chevronForwardCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="end">
            <IonFabButton>
              <IonIcon icon={document}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={colorPalette}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>


        <IonGrid>
          <IonRow>
            <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/mentalhealthpage">
                <IonCard>
                  <img alt="MentalHealth" src="/MentalHealthCard.png" />
                  <IonCardHeader>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/physicalhealthpage">
                <IonCard>
                  <img alt="PhysicalHealth" src="/PhysicalHealthCard.png" height="" />
                  <IonCardHeader>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

              <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/nutritionpage">
                <IonCard>
                  <img alt="Nutrition" src="/NutritionCard.png" />
                  <IonCardHeader>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
                </IonRouterLink>
              </IonCol>

              <IonCol size="6" size-sm="4" style={{}}>
              <IonRouterLink routerLink="/sleeppage">
                <IonCard>
                  <img alt="SleepHabits" src="/SleepCard.png" />
                  <IonCardHeader>
                    <IonCardTitle>Sleep</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
                </IonRouterLink>

                {/* Dropdown for how day was */}
                <IonSelect placeholder="How was your day today?">
                {options.map(({ value, label }) => (
              <IonSelectOption key={value} value={value}>
                {`${value} - ${label}`}
                  </IonSelectOption>
                ))}
              </IonSelect>
              </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;