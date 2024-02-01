// src/components/FullCalendarComponent.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const FullCalendarComponent: React.FC = () => {
  const events = [
    {
      title: 'Event 1',
      date: '2024-01-31', // Specify the date format as needed
    },
    // Add more events as needed
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mental Health Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            events={events}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FullCalendarComponent;
