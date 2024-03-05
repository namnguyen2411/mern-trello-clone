import express from 'express';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World 123!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
