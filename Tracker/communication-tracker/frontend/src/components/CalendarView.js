import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <Calendar value={date} onChange={setDate} />
            <p>Selected date: {date.toDateString()}</p>
        </div>
    );
};

export default CalendarView;
