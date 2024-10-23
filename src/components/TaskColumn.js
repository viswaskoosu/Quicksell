import React from 'react';
import TaskCard from './TaskCard';
import constants from './constants';
const { API_URL, PRIORITY_MAP, STATUS_ICONS } = constants;

const TaskColumn = ({ groupName, tasks, groupBy }) => {
  const renderGroupImage = () => {
    if (groupBy === 'priority') {
      const priorityKey = Object.keys(PRIORITY_MAP).find(
        (key) => PRIORITY_MAP[key].label === groupName
      );
      if (priorityKey) {
        return <img src={PRIORITY_MAP[priorityKey].image} alt={groupName} />;
      }
    }
    return null;
  };

  return (
    <div className="board-column">
      <div className="column-header">
        {renderGroupImage()}
        <h2>{groupName}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="column-content">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default TaskColumn;
