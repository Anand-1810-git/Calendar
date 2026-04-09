import { useState, useEffect } from 'react';

export function useNotes(storageKey = 'calendar-notes') {
    const [notes, setNotes] = useState(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            return stored ? JSON.parse(stored) : {}; // { 'general': '', 'YYYY-MM-DD': '...' }
        } catch (e) {
            console.warn("Storage access failed", e);
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(notes));
        } catch (e) {
            // Handle block issues
        }
    }, [notes, storageKey]);

    const getNote = (key) => notes[key] || '';

    const saveNote = (key, text) => {
        setNotes(prev => {
            const updated = { ...prev };
            if (!text.trim()) {
                delete updated[key];
            } else {
                updated[key] = text;
            }
            return updated;
        });
    };

    return { notes, getNote, saveNote };
}
