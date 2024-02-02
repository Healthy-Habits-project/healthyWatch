import { IonContent, IonHeader, IonGrid, IonRow, IonButton, IonButtons, IonBackButton, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonList } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="Enter Name"></IonInput>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonButton>Save</IonButton>
              <IonButton>Export</IonButton>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
