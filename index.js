const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
