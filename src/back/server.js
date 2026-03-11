import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import process from 'process';  

dotenv.config();

mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log('MongoDB підключено!'))
  .catch(err => console.log('Помилка підключення:', err));

async function createUser() {
  try {
    const newUser = new User({
      name: 'Abs',
      email: 'Abs@examples.com',
      password: 'Abs'
    });
    const savedUser = await newUser.save();
    console.log('Користувач створений:', savedUser);
  } catch (error) {
    console.log('Помилка створення користувача:', error.message);
  }
}

createUser();
