import React, { useState, useEffect } from 'react';
import { useCheckboxContext } from '../contexts/CheckboxContext'; // adjust the path as necessary

const DateTimeDisplay: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const { setState } = useCheckboxContext();

  useEffect(() => {
    setCurrentDateTime(new Date()); // Initialize with the current date and time

    // Clear checkboxes on the first load of the app based on your condition
    // This is a simple example; adjust the condition as needed
    setState(state => ({ ...state, mindfulness: false }));

    const timer = setInterval(() => {
      setCurrentDateTime(new Date()); // Continuously update date and time every second
    }, 1000);

    return () => clearInterval(timer);
  }, [setState]);

  return <div>Current Date and Time: {currentDateTime.toLocaleString()}</div>;
};

export default DateTimeDisplay;
