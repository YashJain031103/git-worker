import express from 'express';
import { gitWorker } from './worker.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Git Worker API Running");
});

app.post('/git-task', (req, res) => {
    try {
      const result = gitWorker(req.body);
  
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: "Git operation failed",
        error: err.message
      });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});