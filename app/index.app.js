import express from 'express';

const app = express();

// Middleware JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Hello from Express app!');
});

app.get('/api-docs', (req, res) => {
  res.send('Swagger documentation here');
});

export default app;