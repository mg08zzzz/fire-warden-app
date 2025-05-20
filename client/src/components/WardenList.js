import React, { useEffect, useState } from 'react';
import api from '../api';

export default function WardenList({ onEdit, refresh }) {
  const [wardens, setWardens] = useState([]);

  const fetchData = async () => {
    const res = await api.get('/');
    setWardens(res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
  };

  const handleDelete = async (id) => {
    await api.delete(`/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div>
      <h2>All Fire Warden Entries</h2>
      {wardens.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Staff No</th>
              <th>Name</th>
              <th>Location</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wardens.map(w => (
              <tr key={w._id}>
                <td>{w.staffNumber}</td>
                <td>{w.firstName} {w.surname}</td>
                <td>{w.location}</td>
                <td>{new Date(w.dateTime).toLocaleString()}</td>
                <td>
                  <button onClick={() => onEdit(w)}>Edit</button>
                  <button onClick={() => handleDelete(w._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}