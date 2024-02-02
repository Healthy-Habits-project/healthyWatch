// src/components/CustomCalendar.tsx
import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  endOfWeek,
  subMonths,
  addMonths,
} from 'date-fns';
import './CustomCalendar.css'; // Make sure this CSS file exists in the same directory

const CustomCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            {'<'}
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="column col-end" onClick={nextMonth}>
          <div className="icon">{">"}</div>
        </div>
      </div>
    );
  };

  const renderDaysOfWeekHeader = () => {
    const dateFormat = 'EEE'; // 3-letter abbreviation of day names
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

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            }`}
            key={day.toString()}
          >
            {format(day, dateFormat)}
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
