import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AvailabilityMonitor() {
  const [wardens, setWardens] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/');
      setWardens(res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
    };
    fetchData();
  }, []);

  const filtered = wardens.filter(w =>
    (w.firstName + ' ' + w.surname + ' ' + w.location + ' ' + w.staffNumber)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="monitor">
      <h2>Fire Warden Availability Monitor</h2>
      <input
        type="text"
        placeholder="Search by name, staff number, or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-box"
      />

      <div className="warden-cards">
        {filtered.map(w => (
          <div className="card" key={w._id}>
            <div className="card-header">
              <strong>{w.firstName} {w.surname}</strong>
              <span className="staff-number">#{w.staffNumber}</span>
            </div>
            <div className="card-body">
              <p><strong>Currently at:</strong> {w.location}</p>
              <p><small>Last updated: {new Date(w.dateTime).toLocaleString()}</small></p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No matches found.</p>}
      </div>
    </div>
  );
}