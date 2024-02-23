import React, { useState, useEffect } from 'react';

export const DateTimeDisplay: React.FC = () => {
    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update the date every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    return (
        <p>Current Date and Time: {currentDateTime.toLocaleString()}</p>
    );
};

export default DateTimeDisplay;

