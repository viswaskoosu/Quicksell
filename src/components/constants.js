const constants = {
    PRIORITY_MAP: {
      1: { label: 'Urgent', color: '#f44336', image: '/images/urgent.png' },
      2: { label: 'High', color: '#ff9800', image: '/images/high.png' },
      3: { label: 'Medium', color: '#ffc107', image: '/images/medium.png' },
      4: { label: 'Low', color: '#8bc34a', image: '/images/low.png' }
    },
    
    STATUS_ICONS: {
      'Todo': '/images/todo.png',
      'In progress': '../icons/in-progress.png',
      'Done': '/images/done.png',
      'Backlog': '/images/backlog.png',
      'Cancelled': '/images/cancelled.png'
    },
    API_URL: 'https://api.quicksell.co/v1/internal/frontend-assignment'
  };
  
  export default constants;
  