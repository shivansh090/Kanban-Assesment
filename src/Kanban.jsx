import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayOptions from './DisplayOptions';
import TicketList from './TicketList';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // default grouping
  const [orderBy, setOrderBy] = useState('priority'); // default ordering

  useEffect(() => {
    // Fetching the data from the API
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        setTickets(response.data.tickets);  // Access tickets array
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <DisplayOptions setGroupBy={setGroupBy} setOrderBy={setOrderBy} />
      {/* Render Tickets */}
      <TicketList tickets={tickets} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
};
export default KanbanBoard;
