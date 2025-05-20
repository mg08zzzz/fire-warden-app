import React, { useState } from 'react';
import WardenForm from './components/WardenForm';
import WardenList from './components/WardenList';
import AvailabilityMonitor from './components/AvailabilityMonitor';
import Login from './components/Login';
import './App.css';

function App() {
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState('form');
  const [user, setUser] = useState(null); // 🔐 logged in user

  const triggerRefresh = () => setRefresh(!refresh);

  if (!user) {
    return (
      <div className="fade-container">
        <Login onLogin={(id) => setUser(id)} />
      </div>
    );
  }

  return (
    <div className="fade-container">
      <div className="container">
        <h1>Fire Warden Tracker</h1>

        <p style={{ textAlign: 'right', fontStyle: 'italic', marginBottom: '1rem' }}>
          Logged in as: {user}
        </p>

        <div className="tab-switcher">
          <button onClick={() => setView('form')}>Log Warden</button>
          <button onClick={() => setView('monitor')}>Availability Monitor</button>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>

        {view === 'form' ? (
          <>
            <WardenForm
              current={editing}
              onSave={triggerRefresh}
              onClear={() => setEditing(null)}
            />
            <WardenList refresh={refresh} onEdit={setEditing} />
          </>
        ) : (
          <AvailabilityMonitor />
        )}
      </div>
    </div>
  );
}

export default App;