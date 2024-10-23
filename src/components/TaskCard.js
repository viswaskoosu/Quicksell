import React from 'react';
import constants from './constants';
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

const { API_URL, PRIORITY_MAP, STATUS_ICONS } = constants;

const TaskCard = ({ task }) => {
  const priorityInfo = PRIORITY_MAP[task.priority] || {};
  const statusIcon = STATUS_ICONS[task.status] || null;

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{task.id}</span>
        <div className="task-status-indicator" style={{ backgroundColor: priorityInfo.color }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {statusIcon && <img src={statusIcon} alt={task.status} className="status-icon" />}
        <h3 className="task-title" style={{ marginLeft: '10px' }}>{task.title}</h3>
      </div>
      <div className="task-tags">
        {task.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="task-details">
        <div className="priority-tag" style={{ backgroundColor: priorityInfo.color }}>
          {/* {priorityInfo.label} */}
        </div>
        {/* <div className="user-info">
          <span className="status-dot"></span>
          {task.user ? task.user.name : 'Unknown User'}
        </div> */}
      </div>
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default TaskCard;
