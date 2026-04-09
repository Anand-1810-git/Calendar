import React from 'react';
import CalendarGrid from './CalendarGrid.jsx';
import HeroImage from './HeroImage.jsx';
import NotesSidebar from './NotesSidebar.jsx';
import { useCalendar } from '../hooks/useCalendar.jsx';
import { useNotes } from '../hooks/useNotes.jsx';

export default function Calendar() {

  const {
    currentDate,
    setCurrentDate,
    days,
    selection,
    handleDateClick,
    nextMonth,
    prevMonth
  } = useCalendar();

  const { getNote, saveNote } = useNotes();

  return (
    <>

      {/* MAIN LAYOUT */}
      <div className="calendar-layout">

        {/* Hero */}
        <div className="hero-section">
          <HeroImage currentDate={currentDate} selection={selection} />
        </div>

        {/* Calendar */}
        <div className="calendar-panel">
          <CalendarGrid
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            days={days}
            selection={selection}
            onDateClick={handleDateClick}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
          />
        </div>

        {/* Notes */}
        <div className="notes-sidebar">
          <NotesSidebar
            selection={selection}
            currentDate={currentDate}
            getNote={getNote}
            saveNote={saveNote}
          />
        </div>

      </div>
    </>
  );
}