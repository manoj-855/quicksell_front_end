import './App.css';
import { useEffect, useState,useCallback } from 'react';
import Card from './components/card_user';
import { GoPlus } from "react-icons/go";
import { PiDotsThreeBold } from "react-icons/pi";
import Cardpriority from './components/card_priority';
import { GiNetworkBars } from "react-icons/gi";
import { MdNetworkWifi } from "react-icons/md";
import { MdNetworkWifi3Bar } from "react-icons/md";
import { MdOutlineNetworkWifi2Bar } from "react-icons/md";
import user_pic from './images/user_act.png'

import { TbProgressAlert } from "react-icons/tb";
import CardStatus from './components/card_status';
import Navbar from './components/navbar';

function App() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState([]);

  const [groupValue, setGroupValue] = useState(getGroupValueFromLocalStorage() || 'status');
  const [orderValue, setOrderValue] = useState('title');

  function getGroupValueFromLocalStorage() {
    const storedState = localStorage.getItem('groupValue');
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null;
  }

  function handleGroupValue(value) {
    setGroupValue(value);
    console.log(value);
  }

  function handleOrderValue(value) {
    setOrderValue(value);
    console.log(value);
  }

  function saveGroupValueToLocalStorage(state) {
    localStorage.setItem('groupValue', JSON.stringify(state));
  }

  const orderDataByValue = useCallback(async (cardsArray) => {
    if (orderValue === 'priority') {
      cardsArray.sort((a, b) => b.priority - a.priority);
    } else if (orderValue === 'title') {
      cardsArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    setTickets([...cardsArray]);
  }, [orderValue]);

  useEffect(() => {
    saveGroupValueToLocalStorage(groupValue);
    const getData = () => {
      fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
        .then((response) => response.json())
        .then((res) => {
          setTickets(res.tickets);
          setUser(res.users);
        })
        orderDataByValue([...tickets]); // Remove this line
      };
    getData();
  }, [orderDataByValue, groupValue]);


// dropdown
const [selectedOption, setSelectedOption] = useState('state');

const handleDropdownChange = (event) => {
  setSelectedOption(event.target.value);
};







// users map
  const userNameMap = {};
  user.forEach(user => {
    userNameMap[user.id] = user.name;
  });

  // Group tickets by user ID
  const ticketsByUser = {};
  tickets.forEach(ticket => {
    const userId = ticket.userId;
    if (!ticketsByUser[userId]) {
      ticketsByUser[userId] = [];
    }
    ticketsByUser[userId].push(ticket);
  });

// on the basis of priority
const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};
const priorityIcons = {
  4: <GiNetworkBars />,
  3: <MdNetworkWifi />,
  2: <MdNetworkWifi3Bar />,
  1: <MdOutlineNetworkWifi2Bar />,
  0: <PiDotsThreeBold/>, 
};
const clusters = {};
  tickets.forEach(ticket => {
    const priority = ticket.priority;
    if (!clusters[priority]) {
      clusters[priority] = [];
    }
    clusters[priority].push(ticket);
  });

  // Sort the clusters by priority
  const sortedClusters = Object.entries(clusters).sort((a, b) => a[0] - b[0]);






// on the basis of clusters status
const clustersStatus = {};
  tickets.forEach(ticket => {
    const status = ticket.status;
    if (!clustersStatus[status]) {
      clustersStatus[status] = [];
    }
    clustersStatus[status].push(ticket);
  });
  const sortedClustersStatus = Object.entries(clustersStatus).sort();
  const statusIcons = {
    'Todo': <i class="fa-regular fa-circle"></i>,
    'In progress': <i class="fa-solid fa-circle-half-stroke"></i>,
    'Backlog': < TbProgressAlert />,
  };



  return (
    <div className="App">
      {/* <div className='nav'>
      <div className='nav_box'>
        <img src={filter} alt="filter"/>
          <select style={{border:'none',fontSize:'15px'}} value={selectedOption} onChange={handleDropdownChange} placeholder="Display">
            <option  value="default" disabled>Display</option>
            <option value="state">By Status: </option>
            <option value="user">By User:</option>
            <option value="priority">By Priority: </option>
          </select>
          <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div> */}
    <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
    />

{/* sort by user */}
   {groupValue === 'user' &&  <div className="ticket-container">
        {Object.keys(ticketsByUser).map(userId => (
          <div className="user-tickets" key={userId}>
            <div className='top-user'>
              <div className='top-user1'>
                <img src={user_pic} alt="user"/>
                <p>{userNameMap[userId]}'s Tickets</p>
              </div>
              <div className='top-user2'>
                <GoPlus />
                <PiDotsThreeBold />
              </div>
            </div>
            <div className="ticket-list">
              {ticketsByUser[userId].map(ticket => (
                <Card key={ticket.id} title={ticket.id} desc={ticket.title} />
              ))}
            </div>
          </div>
          ))}
      </div>
}

{/* on the basis of priority */}
{groupValue === 'priority' && <div className="ticket-container">
      {sortedClusters.map(([priority, ticketsInCluster]) => (
        <div key={priority} className="user-tickets">
          <div className='top-user'>
            <div className='top-user1'>
              {priorityIcons[priority]}
              <p>{`${priorityLabels[priority]} ${ticketsInCluster.length} `}</p>
            </div>
            <div className='top-user2'>
              <GoPlus />
              <PiDotsThreeBold />
            </div>
          </div>
          <div className="ticket-list">
            {ticketsInCluster.map(ticket => (
              <Cardpriority key={ticket.id} title={ticket.id} desc={ticket.title} user={ticket.userId}/>
            ))}
          </div>
        </div>
      ))}
    </div>
}


{/* on the basis of ticket's status */}
{groupValue === 'status' &&<div className="ticket-container">
      {sortedClustersStatus.map(([status, ticketsInCluster]) => (
        <div key={status} className="user-tickets">
          <div className='top-user'>
            <div className='top-user1'>
              <p>{status}</p>
                {statusIcons[status]}
            </div>
            <div className='top-user2'>
              <GoPlus />
              <PiDotsThreeBold />
            </div>
          </div>
          <div className="ticket-list">
            {ticketsInCluster.map(ticket => (
               <CardStatus key={ticket.id} title={ticket.id} desc={ticket.title} user={ticket.userId}/>
            ))}
          </div>
        </div>
      ))}
    </div>
}

    



      </div>
  );
}

export default App;
