import React, { useState, useEffect } from 'react';
import { PenLine } from 'lucide-react';

export default function NotesSidebar({ selection, currentDate, getNote, saveNote }) {
    // Determine which key to use based on selection
    let noteKey = 'general';
    let contextLabel = 'General Notes / ' + currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    if (selection.start && selection.end) {
        const sStr = selection.start.toLocaleDateString();
        const eStr = selection.end.toLocaleDateString();
        noteKey = `range_${sStr}_${eStr}`;
        contextLabel = `Trip Notes: ${sStr} - ${eStr}`;
    } else if (selection.start) {
        const sStr = selection.start.toLocaleDateString();
        noteKey = `date_${sStr}`;
        contextLabel = `Notes for ${sStr}`;
    }

    // Local state for the textarea so it updates fluidly
    const [localText, setLocalText] = useState(getNote(noteKey));

    // Sync when key changes
    useEffect(() => {
        setLocalText(getNote(noteKey));
    }, [noteKey, getNote]);

    const handleChange = (e) => {
        setLocalText(e.target.value);
        saveNote(noteKey, e.target.value);
    };

    return (
        <div className="notes-sidebar">
            <div className="notes-header">
                <PenLine size={20} />
                <span>Memos</span>
            </div>
            <div className="notes-context">
                {contextLabel}
            </div>
            <textarea
                className="notes-textarea"
                placeholder="Note down specifics for this time period..."
                value={localText}
                onChange={handleChange}
            />
            {noteKey === 'general' && (
                <span className="date-hint">Tip: Select dates on the calendar to attach specific notes.</span>
            )}
        </div>
    );
}
