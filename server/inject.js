require('dotenv').config();
const mongoose = require('mongoose');
const FireWarden = require('./models/FireWarden');

const LOCATIONS = [
  "Alwyn Hall", "Beech Glade", "Bowers Building", "Burma Road Student Village",
  "Centre for Sport", "Chapel", "The Cottage", "Fred Wheeler Building", "Herbert Jarman Building",
  "Holm Lodge", "Kenneth Kettle Building", "King Alfred Centre", "Martial Rose Library",
  "Masters Lodge", "Medecroft", "Medecroft Annexe", "Paul Chamberlain Building",
  "Queen’s Road Student Village", "St Alphege", "St Edburga", "St Elizabeth’s Hall",
  "St Grimbald’s Court", "St James’ Hall", "St Swithun’s Lodge", "The Stripe",
  "Business School", "Tom Atkinson Building", "West Downs Centre",
  "West Downs Student Village", "Winton Building", "Students’ Union"
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateEntry = (i) => {
  const id = 1000 + i;
  return {
    staffNumber: `FW-${id}`,
    firstName: `Test${i}`,
    surname: `User${i}`,
    location: random(LOCATIONS),
    dateTime: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)) // past 5 days
  };
};

async function seedDB(count = 20) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB ✅');

    const entries = Array.from({ length: count }, (_, i) => generateEntry(i));

    await FireWarden.insertMany(entries);
    console.log(`${count} test fire warden entries added ✅`);

    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error ❌:', err);
  }
}

seedDB(15);