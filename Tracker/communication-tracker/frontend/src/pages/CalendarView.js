// src/components/CalendarView.js
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Enables interaction (clicking, dragging)
import FullCalendar from '@fullcalendar/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch communication logs from your API (for past and upcoming communications)
    axios.get('http://localhost:5001/api/communications')  // Replace with your actual endpoint
      .then((response) => {
        // Format the communication logs into FullCalendar event format
        const calendarEvents = response.data.map(log => ({
          title: log.communicationType,   // Type of communication (e.g., call, email)
          date: new Date(log.communicationDate).toISOString().split('T')[0],  // Format date
          description: log.notes,        // Notes for the communication (can be added to a tooltip)
        }));
        setEvents(calendarEvents);
      })
      .catch((error) => {
        console.error('Error fetching communication logs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Communication Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // Adding plugins for day grid and interaction
        initialView="dayGridMonth" // Default view to month grid
        events={events}            // Set events fetched from API
        eventClick={(info) => {
          alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
        }}
        eventColor="#378006"        // Customize event color (optional)
      />
    </div>
  );
};

export default CalendarView;
