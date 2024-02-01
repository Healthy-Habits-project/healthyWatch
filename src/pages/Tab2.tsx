// src/pages/CheckboxPage.tsx
import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonPage, IonList, IonItem, IonCheckbox, IonRouterLink } from '@ionic/react';
import FullCalendarComponent from '../components/FullCalendarComponent';

const CheckboxPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Render the FullCalendarComponent */}
        <FullCalendarComponent />
      </IonContent>
    </IonPage>
  );
};

export default CheckboxPage;
