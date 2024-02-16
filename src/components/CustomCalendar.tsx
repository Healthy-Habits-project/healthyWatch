// CustomCalendar.tsx
import React, { useState } from 'react';
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
}

interface CustomCalendarProps {
  dayRatings: { [key: string]: number };
  onDaySelect: (date: string) => void;
  calculatedColor: string;
  progressData: ProgressData; // Use the defined ProgressData type here
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ dayRatings, onDaySelect, calculatedColor, progressData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const MAX_CHECKBOXES = {
    mentalHealth: 5, // Example maximum counts
    physicalHealth: 6,
    nutrition: 4,
    sleep: 10,
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    const today = new Date();

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDay = format(day, "yyyy-MM-dd");
        const dayRating = dayRatings[formattedDay] || 0;
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

        const renderProgressBars = (progressData: ProgressData) => {
          // Calculate percentage of checked items for each category
          const mentalHealthPercentage = (progressData.mentalHealthCheckedCount / MAX_CHECKBOXES.mentalHealth) * 100;
          const physicalHealthPercentage = (progressData.physicalHealthCheckedCount / MAX_CHECKBOXES.physicalHealth) * 100;
          const nutritionPercentage = (progressData.nutritionCheckedCount / MAX_CHECKBOXES.nutrition) * 100;
          const sleepPercentage = (progressData.sleepCheckedCount / MAX_CHECKBOXES.sleep) * 100;
          return (
            <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: `${mentalHealthPercentage}%`, height: '5px', backgroundColor: 'red' }}></div>
              <div style={{ width: `${physicalHealthPercentage}%`, height: '5px', backgroundColor: 'blue' }}></div>
              <div style={{ width: `${nutritionPercentage}%`, height: '5px', backgroundColor: 'green' }}></div>
              <div style={{ width: `${sleepPercentage}%`, height: '5px', backgroundColor: 'orange' }}></div>
            </div>
          );
        };


        days.push(
          <div
            className={`column cell ${!isCurrentMonth ? 'disabled' : ''} ${isTodayFlag ? 'today' : ''}`}
            key={day.toString()}
            style={cellStyle}
            onClick={() => isEligibleForRating && onDaySelect(formattedDay)}
          >
            {format(day, "d")}
            {isTodayFlag && renderProgressBars(progressData)}
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
