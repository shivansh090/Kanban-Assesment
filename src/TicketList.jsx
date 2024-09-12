import React from 'react';
import TicketCard from './TicketCard'; // Ensure this component is properly imported

// Import your priority images
import noPriorityImage from './assets/noPriority.svg';
import lowImage from './assets/low.svg';
import mediumImage from './assets/medium.svg';
import highImage from './assets/high.svg';
import urgentImage from './assets/urgent.svg';

// Import your status images
import todoImage from './assets/todo.svg';
import backlogImage from './assets/backlog.svg';
import inProgressImage from './assets/inprogress.svg';

const priorityImages = [noPriorityImage, lowImage, mediumImage, highImage, urgentImage];
const statusImages = [todoImage, backlogImage, inProgressImage];

const TicketList = ({ tickets = [], users = [], groupBy = 'status', orderBy = 'priority' }) => {
  if (!Array.isArray(tickets) || tickets.length === 0) return <p>No tickets available</p>;

  // Ensure users is an array and has data
  const userMap = Array.isArray(users) ? users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {}) : {};

  // Group tickets
  const groupedTickets = tickets.reduce((group, ticket) => {
    const key = groupBy === 'userId' ? userMap[ticket.userId] : ticket[groupBy];
    if (!group[key]) group[key] = [];
    group[key].push(ticket);
    return group;
  }, {});

  // Sort tickets in each group
  Object.keys(groupedTickets).forEach(group => {
    groupedTickets[group].sort((a, b) => {
      if (orderBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  });
  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="kanban-column">
          <h3>
            {groupBy === 'status'
              ? <>
                  {statusImages[
                    groupKey === 'Todo' ? 0 :
                    groupKey === 'Backlog' ? 1 :
                    groupKey === 'InProgress' ? 2 : 0 // Default to the first image if none match
                  ] && <img src={statusImages[
                    groupKey === 'Todo' ? 0 :
                    groupKey === 'Backlog' ? 1 :
                    groupKey === 'InProgress' ? 2 : 0
                  ]} alt={`Status ${groupKey}`} style={{ width: '24px', height: '24px', marginRight: '8px' }} />}
                  {groupKey}
                </>
              : <>
                  {priorityImages[groupKey] && <img src={priorityImages[groupKey]} alt={`Priority ${groupKey}`} style={{ width: '24px', height: '24px', marginRight: '8px' }} />}
                  {['NoPriority', 'Low', 'Medium', 'High', 'Urgent'][groupKey]}
                </>
            }
          </h3>
          {groupedTickets[groupKey].map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
