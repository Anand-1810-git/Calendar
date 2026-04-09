import { useState, useMemo } from 'react';

export function useCalendar(initialDate = new Date()) {
    // ✅ Use initialDate properly
    const [currentDate, setCurrentDate] = useState(
        new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
    );

    const [selection, setSelection] = useState({ start: null, end: null });

    const days = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const daysArray = [];

        // Prev month padding
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            daysArray.push({
                date: new Date(year, month - 1, daysInPrevMonth - i),
                isCurrentMonth: false,
            });
        }

        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
            });
        }

        // Next month padding
        const paddingCells = 42 - daysArray.length;
        for (let i = 1; i <= paddingCells; i++) {
            daysArray.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
            });
        }

        return daysArray;
    }, [currentDate]);

    const handleDateClick = (date) => {
        if (!selection.start || (selection.start && selection.end)) {
            setSelection({ start: date, end: null });
        } else if (selection.start && !selection.end) {
            if (date < selection.start) {
                setSelection({ start: date, end: selection.start });
            } else {
                setSelection({ start: selection.start, end: date });
            }
        }
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    return {
        currentDate,
        setCurrentDate, 
        days,
        selection,
        setSelection,
        handleDateClick,
        nextMonth,
        prevMonth
    };
}