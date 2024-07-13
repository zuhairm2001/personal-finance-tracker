import mongoose from 'mongoose';

const username = process.env.mongoDBuser
const password = process.env.mongoDBpassword

mongoose.connect('mongodb+srv://<${username}>:<${password}>@finance-tracker-db.eyhty.mongodb.net/financeApp?retryWrites=true&w=majority')