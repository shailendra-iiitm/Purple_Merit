/**
 * Script to check all users in database
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const users = await User.find();
    
    console.log(`Total users in database: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log('  ID:', user._id);
      console.log('  Full Name:', user.fullName || 'MISSING');
      console.log('  Email:', user.email || 'MISSING');
      console.log('  Role:', user.role);
      console.log('  Status:', user.status);
      console.log('  Created At:', user.createdAt);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();
