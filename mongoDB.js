const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1';
const dbConnect = new MongoClient(url);

// Database Name
const dbName = 'employes';

async function dbConnectt() {
  
  await dbConnect.connect();
  console.log('Connected successfully to server');
  const db = dbConnect.db(dbName);
  return db
}
dbConnectt()

module.exports=dbConnectt();