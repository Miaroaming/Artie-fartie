const express = require('express');
const app = express();
const port = 4000;

// Home route for the backend
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!'); 
  // message shown when we navigate to this URL
  });

  // Listen to changes
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});