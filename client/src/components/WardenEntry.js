import React, { useState, useEffect } from 'react';
import api from '../api';

const locations = [
  "Alwyn Hall", "Beech Glade", "Bowers Building", "Burma Road Student Village",
  "Centre for Sport", "Chapel", "The Cottage", "Fred Wheeler Building", "Herbert Jarman Building",
  "Holm Lodge", "Kenneth Kettle Building", "King Alfred Centre", "Martial Rose Library",
  "Masters Lodge", "Medecroft", "Medecroft Annexe", "Paul Chamberlain Building",
  "Queen’s Road Student Village", "St Alphege", "St Edburga", "St Elizabeth’s Hall",
  "St Grimbald’s Court", "St James’ Hall", "St Swithun’s Lodge", "The Stripe",
  "Business School", "Tom Atkinson Building", "West Downs Centre",
  "West Downs Student Village", "Winton Building", "Students’ Union"
];

export default function WardenEntry({ current, onSave, onClear }) {
  const [formData, setFormData] = useState({
    staffNumber: '',
    firstName: '',
    surname: '',
    location: ''
  });

  useEffect(() => {
    if (current) setFormData(current);
    else resetForm();
  }, [current]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (current?._id) {
      await api.put(`/${current._id}`, formData);
    } else {
      await api.post('/', formData);
    }
    resetForm();
    onSave();
  };

  const resetForm = () => {
    setFormData({ staffNumber: '', firstName: '', surname: '', location: '' });
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>{current ? "Edit" : "Log"} Warden Location</h2>
      <input name="staffNumber" placeholder="Staff Number" value={formData.staffNumber} onChange={handleChange} required />
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} required />
      <select name="location" value={formData.location} onChange={handleChange} required>
        <option value="">Select Location</option>
        {locations.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      <div className="button-row">
        <button type="submit" className="btn primary">{current ? "Update" : "Submit"}</button>
        {current && <button type="button" className="btn secondary" onClick={resetForm}>Cancel</button>}
      </div>
    </form>
  );
}