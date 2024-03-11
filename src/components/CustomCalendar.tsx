// CustomCalendar.tsx
import React, { useState, useEffect } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  endOfWeek,
  subMonths,
  addMonths,
  isToday,
  isBefore,
  differenceInCalendarDays
} from 'date-fns';
import './CustomCalendar.css';

interface ProgressData {
  mentalHealthCheckedCount: number;
  physicalHealthCheckedCount: number;
  nutritionCheckedCount: number;
  sleepCheckedCount: number;
  mentalHealthPercentage?: number;
  physicalHealthPercentage?: number;
  nutritionPercentage?: number;
  sleepPercentage?: number;
}

interface CustomCalendarProps {
  dayRatings: { [key: string]: number };
  onDaySelect: (date: string) => void;
  calculatedColor: string;
  progressData: ProgressData; // Use the defined ProgressData type here
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ dayRatings, onDaySelect, calculatedColor, progressData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  // Define the state for holding the progress data of the selected day
  const [selectedDayProgress, setSelectedDayProgress] = useState<ProgressData | null>(null);

  // Assuming selectedDay and selectedDayProgress are already defined in your state
  const handleDayClick = (formattedDay: string) => {
    // Convert the formattedDay string back to a Date object for comparison
    const clickedDate = new Date(formattedDay);
    const today = new Date();

    // Ensure the clicked date is set to the start of the day for accurate comparison
    clickedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Determine if the clicked day is today or in the past (making it eligible for rating)
    const isEligibleForRating = clickedDate <= today;

    if (isEligibleForRating) {
      onDaySelect(formattedDay);

      const healthDataByDate = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');
      const dayData = healthDataByDate[formattedDay];

      if (dayData) {
        // Assuming dayData already contains the percentage properties
        setSelectedDay(formattedDay);
        setSelectedDayProgress(dayData);
      } else {
        console.log(`No health data available for ${formattedDay}.`);
        setSelectedDayProgress(null);
      }
    }
  };


  const MAX_CHECKBOXES = {
    mentalHealth: 8,
    physicalHealth: 6,
    nutrition: 4,
    sleep: 10,
  };


  const saveHealthData = (data: ProgressData, date: string) => {
    const healthData = {
      mentalHealthPercentage: (data.mentalHealthCheckedCount / MAX_CHECKBOXES.mentalHealth) * 100,
      physicalHealthPercentage: (data.physicalHealthCheckedCount / MAX_CHECKBOXES.physicalHealth) * 100,
      nutritionPercentage: (data.nutritionCheckedCount / MAX_CHECKBOXES.nutrition) * 100,
      sleepPercentage: (data.sleepCheckedCount / MAX_CHECKBOXES.sleep) * 100,
    };

    const existingData = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');
    existingData[date] = healthData;
    localStorage.setItem('healthDataByDate', JSON.stringify(existingData));
  };


  useEffect(() => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    saveHealthData(progressData, currentDate);

  }, [progressData]);


  const getColorForRating = (rating: number): string => {
    switch (rating) {
      case 1: return '#fa0000';
      case 2: return '#f94300';
      case 3: return '#f46400';
      case 4: return '#eb8000';
      case 5: return '#dd9900';
      case 6: return '#cbb000';
      case 7: return '#b5c600';
      case 8: return '#98da00';
      case 9: return '#6fed00';
      case 10: return '#00ff00';
      default: return '';
    }
  };


  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="header row flex-middle">
        <div className="column col-start" onClick={prevMonth}>
          <div className="icon">{'<'}</div>
        </div>
        <div className="column col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="column col-end" onClick={nextMonth}>
          <div className="icon">{'>'}</div>
        </div>
      </div>
    );
  };

  const renderDaysOfWeekHeader = () => {
    const dateFormat = 'EEE';
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column cell" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="row">{days}</div>;
  };


  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const healthDataByDate = JSON.parse(localStorage.getItem('healthDataByDate') || '{}');

    const rows = [];
    let days = [];
    let day = startDate;
    const today = new Date();

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDay = format(day, "yyyy-MM-dd");
        const dayRating = dayRatings[formattedDay] || 0;
        const dayHealthData = healthDataByDate[formattedDay];
        const isTodayFlag = isToday(day);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const backgroundColor = isTodayFlag ? calculatedColor : getColorForRating(dayRating);
        const isDayInPastWeek = differenceInCalendarDays(today, day) <= 7 && differenceInCalendarDays(today, day) >= 0;
        const isEligibleForRating = isTodayFlag || (isBefore(day, today) && isDayInPastWeek);
        let cellStyle: React.CSSProperties = {
          cursor: 'pointer',
          opacity: 1,
          position: 'relative',
          backgroundColor: isEligibleForRating ? 'white' : '#929693',
          border: '1px solid #ddd', // Default border color
        };
        if (isTodayFlag) {
          cellStyle.border = `6px solid ${calculatedColor}`;
        }
        if (dayRating) {
          const ratingColor = getColorForRating(dayRating);
          cellStyle.backgroundColor = ratingColor;
        }

        const renderProgressBars = (progressData: ProgressData | null) => {
          if (!progressData) {
            return null; // No progress data for this day.
          }
          // Calculate percentage of checked items for each category
          const mentalHealthPercentage = (progressData.mentalHealthCheckedCount / MAX_CHECKBOXES.mentalHealth) * 100;
          const physicalHealthPercentage = (progressData.physicalHealthCheckedCount / MAX_CHECKBOXES.physicalHealth) * 100;
          const nutritionPercentage = (progressData.nutritionCheckedCount / MAX_CHECKBOXES.nutrition) * 100;
          const sleepPercentage = (progressData.sleepCheckedCount / MAX_CHECKBOXES.sleep) * 100;
          const barHeight = '25%';
          return (
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%', // Ensure the container takes the full height of the cell
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                flex: 1, // This will allow the bar to fill the space evenly
                width: `${progressData.mentalHealthPercentage || 0}%`,
                backgroundColor: '#ebc2ff'
              }}></div>
              <div style={{
                flex: 1,
                width: `${progressData.physicalHealthPercentage || 0}%`,
                backgroundColor: '#a873e8'
              }}></div>
              <div style={{
                flex: 1,
                width: `${progressData.nutritionPercentage || 0}%`,
                backgroundColor: '#56d1dc'
              }}></div>
              <div style={{
                flex: 1,
                width: `${progressData.sleepPercentage || 0}%`,
                backgroundColor: '#5d7bd5'
              }}></div>

            </div>
          );
        };
        days.push(
          <div
            className={`column cell ${!isCurrentMonth ? 'disabled' : ''} ${isTodayFlag ? 'today' : ''}`}
            key={day.toString()}
            style={cellStyle}
            onClick={() => handleDayClick(formattedDay)}


          >
            {format(day, "d")}
            {selectedDay === formattedDay && selectedDayProgress && renderProgressBars(selectedDayProgress)}


          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row" key={day.toString()}>{days}</div>);
      days = [];
    }

    return <div className="body">{rows}</div>;
  };


  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDaysOfWeekHeader()}
      {renderCells()}
    </div>
  );
};

export default CustomCalendar;
