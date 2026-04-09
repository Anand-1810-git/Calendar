import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({
    currentDate,
    setCurrentDate,
    days,
    selection,
    onDateClick,
    nextMonth,
    prevMonth
}) {

    const dateRef = useRef(null);

    const isSameDay = (d1, d2) => {
        return d1 && d2 && d1.toDateString() === d2.toDateString();
    };

    const getDayClasses = (dayObj) => {
        const { date, isCurrentMonth } = dayObj;
        let classes = ['day-cell'];

        if (!isCurrentMonth) classes.push('inactive-month');
        if (isSameDay(date, new Date())) classes.push('is-today');

        if (selection.start && isSameDay(date, selection.start)) {
            classes.push('is-start');
        }
        if (selection.end && isSameDay(date, selection.end)) {
            classes.push('is-end');
        }

        if (
            selection.start &&
            selection.end &&
            date > selection.start &&
            date < selection.end
        ) {
            if (isCurrentMonth) classes.push('in-range');
            else classes.push('in-range', 'opacity-50');
        }

        return classes.join(' ');
    };

    return (
        <div className="calendar-panel">

            {/* HEADER */}
            <div className="calendar-header">

                {/* LEFT */}
                <button className="month-nav-btn" onClick={prevMonth}>
                    <ChevronLeft size={20} />
                </button>

                {/* CENTER */}
                <div className="header-center">

                    <div className="current-month-display">
                        <span className="current-month">
                            {currentDate.toLocaleString('default', { month: 'long' })}
                        </span>
                        <span className="current-year">
                            {currentDate.getFullYear()}
                        </span>
                    </div>

                    {/* 🔥 CLEAN DATE PICKER */}
                    <div className="date-search-wrapper">
                        <button
                            className="date-search-btn"
                            onClick={() => dateRef.current.showPicker()}
                        >
                            Jump to Date
                        </button>

                        <input
                            ref={dateRef}
                            type="date"
                            className="hidden-date-input"
                            onChange={(e) => {
                                const selected = new Date(e.target.value);
                                setCurrentDate(
                                    new Date(selected.getFullYear(), selected.getMonth(), 1)
                                );
                            }}
                        />
                    </div>

                </div>

                {/* RIGHT */}
                <button className="month-nav-btn" onClick={nextMonth}>
                    <ChevronRight size={20} />
                </button>

            </div>

            {/* WEEKDAYS */}
            <div className="weekdays-grid">
                {WEEKDAYS.map(day => (
                    <div key={day} className="weekday-header">{day}</div>
                ))}
            </div>

            {/* DAYS */}
            <div className="days-grid">
                {days.map((dayObj, i) => (
                    <button
                        key={i}
                        className={getDayClasses(dayObj)}
                        onClick={() => onDateClick(dayObj.date)}
                    >
                        {dayObj.date.getDate()}
                    </button>
                ))}
            </div>

        </div>
    );
}