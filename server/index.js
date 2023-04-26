const express = require('express');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Check if server is already running
if (server.listening) {
  console.log(`Server is already running on port ${port}`);
} else {
  console.log(`Server is not running`);
}
