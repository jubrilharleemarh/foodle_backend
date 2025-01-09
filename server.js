const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




const app = express();

const port = process.env.PORT || 5000;

// import the router
const authRouter = require('./routes/auth.js');

//

dotenv.config();


const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch(err => console.log(err));

// Body parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

// use the router
app.use('/', authRouter);

app.listen(process.env.PORT || 5000, () => {
   console.log(`Server is running on port ${port}`);
});

