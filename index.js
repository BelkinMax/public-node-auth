require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const authRouter = require('./authRouter');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://max_belkin:${process.env.DB_PASS}@cluster0.hhgf8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
