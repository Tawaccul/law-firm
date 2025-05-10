// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы и модели
const ServiceSchema = new mongoose.Schema({
  icon: String,
  name: String,
  type: String,
  link: String
});

const Service = mongoose.model('Service', ServiceSchema);

// Middleware
app.use(express.json());

// API endpoints
app.post('/api/services', async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).send(service);
});

app.get('/api/services', async (req, res) => {
  const services = await Service.find();
  res.send(services);
});

app.delete('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
