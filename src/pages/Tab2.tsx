// src/pages/CheckboxPage.tsx
import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonList, IonItem, IonLabel, IonCheckbox, IonRouterLink } from '@ionic/react';
import CheckboxItem from '../components/CheckboxItem';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Calendar Page?
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonCheckbox aria-label="Checkbox Label" />
          </IonItem>
          <IonItem>
            <IonCheckbox aria-label="Checkbox Label" />
          </IonItem>
        </IonList>
        <IonRouterLink routerLink="/about">Go to About Page</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
