import React from 'react';
import './App.css';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Task Management Board</h1>
        </div>
      </header>
      <main>
        <TaskBoard />
      </main>
      <footer>
        <p>© 2024 Task Management Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
