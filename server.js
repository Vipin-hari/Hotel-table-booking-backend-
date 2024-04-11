const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Request = require('./models/Request');
const ContactMessage = require('./models/ContactMessage')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Hotel");

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

app.post('/requests', async (req, res) => {
  try {
    const { name, email, date, time, headCount, contactNumber } = req.body;

    if (!name || !email || !date || !time || !headCount || !contactNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRequest = new Request({
      name,
      email,
      date,
      time,
      headCount,
      contactNumber
    });

    await newRequest.save();

    res.status(201).json({ message: 'Reservation submitted successfully' });
  } catch (error) {
    console.error('Error saving request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      message
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
