import React from 'react';

const DisplayMenu = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  return (
    <div className="display-menu">
      <label>Group by:</label>
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="select-control">
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
      <label>Sort by:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select-control">
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
      <style jsx>{`
        .display-menu {
          display: flex;
          gap: 12px;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default DisplayMenu;
