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
} from 'date-fns';
import './CustomCalendar.css'; // Ensure this CSS file is correctly referenced

interface CustomCalendarProps {
  dayRatings: { [key: string]: number };
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ dayRatings }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getColorForRating = (rating: number): string => {
    switch (rating) {
      case 1: return '#fc6203';
      case 2: return '#fc9003';
      case 3: return '#fcba03';
      case 4: return '#fce703';
      case 5: return '#99ff00';
      case 6: return '#1aff00';
      case 7: return '#00c414';
      case 8: return '#109c1e';
      case 9: return '#00ed4b';
      case 10: return '#00ff51';
      default: return ''; // Default case if no rating
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

    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDay = format(day, "yyyy-MM-dd");
        const dayRating = dayRatings[formattedDay];
        const backgroundColor = getColorForRating(dayRating);
        const cellStyle = {
          backgroundColor,
          borderColor: dayRating === 10 ? 'gold' : '#ddd',
          borderWidth: dayRating === 10 ? '2px' : '1px',
          borderStyle: 'solid',
        };
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            }`}
            key={day.toString()}
            style={cellStyle}
          >
            {format(day, "d")}
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
