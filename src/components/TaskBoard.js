import React, { useState, useEffect } from 'react';
import TaskIcons from './TaskIcons';
import add from '../icons/add.svg';
import three_dot from '../icons/3 dot menu.svg'
import urgent_img from '../icons/SVG - Urgent Priority colour.svg';
import high_img from '../icons/Img - High Priority.svg'
import medium_img from '../icons/Img - Medium Priority.svg'
import low_img from '../icons/Img - Low Priority.svg'
import no_priority_img from '../icons/No-priority.svg'
import to_do_img from '../icons/To-do.svg';
import in_progress_img from '../icons/in-progress.svg';
import done_img from '../icons/Done.svg';
import backlog_img from '../icons/Backlog.svg';
import cancelled_img from '../icons/Cancelled.svg';
import { computeHeadingLevel } from '@testing-library/react';
const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

// Map for priority with colors and icons
const PRIORITY_MAP = {
  4: {
    label: 'Urgent',
    color: '#FF5733',
    icon: TaskIcons.PriorityUrgentColor,
    greyIcon: TaskIcons.PriorityUrgentGrey,
    image: urgent_img, // Replace with actual image path
  },
  3: {
    label: 'High',
    color: '#FFA533',
    icon: TaskIcons.PriorityHigh,
    image: high_img, // Replace with actual image path
  },
  2: {
    label: 'Medium',
    color: '#33A3FF',
    icon: TaskIcons.PriorityMedium,
    image: medium_img, // Replace with actual image path
  },
  1: {
    label: 'Low',
    color: '#33FF57',
    icon: TaskIcons.PriorityLow,
    image: low_img, // Replace with actual image path
  },
  0: {
    label: 'No priority',
    color: '#CCCCCC',
    icon: TaskIcons.PriorityNone,
    image: no_priority_img, // Replace with actual image path
  },
};

const STATUS_ICONS = {
  Todo: to_do_img,          // Replace with the actual path to your "To-do" image
  'In progress': in_progress_img, // Replace with the actual path to your "In-progress" image
  Done: done_img,           // Replace with the actual path to your "Done" image
  Backlog: backlog_img,     // Add images for Backlog if required
  Cancelled: cancelled_img, // Add images for Cancelled if required
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState(() =>
    localStorage.getItem('groupBy') || 'status'
  );
  const [sortBy, setSortBy] = useState(() =>
    localStorage.getItem('sortBy') || 'priority'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const getUserById = (userId) => users.find((user) => user.id === userId);

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const groupTasks = () => {
    const grouped = {};

    if (groupBy === 'status') {
      grouped['Todo'] = [];
      grouped['In progress'] = [];
      grouped['Backlog'] = [];
      grouped['Done'] = []; // Added for completeness
      grouped['Cancelled'] = []; // Added for completeness
    } else if (groupBy === 'user') {
      users.forEach((user) => {
        grouped[user.name] = [];
      });
    } else if (groupBy === 'priority') {
      Object.values(PRIORITY_MAP).forEach(({ label }) => {
        grouped[label] = [];
      });
    }

    tasks.forEach((task) => {
      if (groupBy === 'status') {
        grouped[task.status].push(task);
      } else if (groupBy === 'user') {
        const user = getUserById(task.userId);
        if (user) {
          grouped[user.name].push(task);
        }
      } else if (groupBy === 'priority') {
        grouped[PRIORITY_MAP[task.priority].label].push(task);
      }
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key] = sortTasks(grouped[key]);
    });

    return grouped;
  };

  const renderTaskCard = (task) => {
    const user = getUserById(task.userId);
    const priorityInfo = PRIORITY_MAP[task.priority] || {};
    const statusIcon = STATUS_ICONS[task.status] || null;
    return (
      <div className="task-card" key={task.id}>
        <div className="task-header">
          <span className="task-id">{task.id}</span>
          <div
            className="task-status-indicator"
            style={{ backgroundColor: priorityInfo.color }}
          ></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  {statusIcon && <img src={statusIcon} alt={task.status} className="status-icon" />}
  <h3 className="task-title" style={{ marginLeft: '10px' }}>{task.title}</h3>
</div>


        <div className="task-tags">
          {task.tag.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderGroupImage = (groupName) => {
    console.log(groupName)
    switch (groupBy) {
      case 'priority':
        const priorityKey = Object.keys(PRIORITY_MAP).find(
          (key) => PRIORITY_MAP[key].label === groupName
        );
        const priority_img=PRIORITY_MAP[priorityKey].image;
        console.log('priorityImg:', priority_img);
        if (priorityKey) {
          console.log('Rendering image:', priority_img); 
          return <img src={priority_img} alt={groupName} />;
        }
        break;
      default:
        return null;
    }
  };
  
  const renderDisplayMenu = () => (
    <div className="display-menu">
      <label>Group by:</label>
      <select
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value)}
        className="select-control"
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
      <label>Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="select-control"
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );

  return (
    <div className="task-board">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="task-board-header">
        {renderDisplayMenu()}
      </div>
      <div className="task-board-body">
        {Object.entries(groupTasks()).map(([groupName, tasks]) => (
          <div className="board-column" key={groupName}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Left section: group image, group name, task count */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {renderGroupImage(groupName)}
                <h2 style={{ marginLeft: '10px' }}>{groupName}</h2>
                <span style={{ marginLeft: '10px' }} className="task-count">{tasks.length}</span>
              </div>

              {/* Right section: add icon and three dots */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img src={add} alt="Add" style={{ marginRight: '10px' }} />
                <img src={three_dot} alt="More options" />
              </div>
            </div>

            <div className="column-content">
              {tasks.map((task) => renderTaskCard(task))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .task-board {
          padding: 20px;
          background-color: #f4f5f8;
          min-height: 100vh;
        }

        .task-board-header {
          display: flex;
          justify-content: space-between;
        }

        .display-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .task-board-body {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .board-column {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
        }

        .column-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .column-header h2 {
          margin-right: 8px;
        }

        .task-count {
          // background-color: #e1e4e8;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .task-card {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .task-header {
          display: flex;
          justify-content: space-between;
        }

        .task-status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .task-title {
          font-size: 14px;
          margin-bottom: 12px;
        }

        .task-tags {
          margin-bottom: 12px;
        }

        .tag {
          background-color: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .task-details {
          display: flex;
          justify-content: space-between;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .status-dot.available {
          background-color: #10b981;
        }

        .status-dot:not(.available) {
          background-color: #d1d5db;
        }

        .status-icon {
          width: 16px;
          height: 16px;
        }

      `}</style>
    </div>
  );
};

export default TaskBoard;
