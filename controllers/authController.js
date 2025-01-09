const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const {v4: uuidv4} = require('uuid');


module.exports = {

    // Register a new user
    createUser: async (req, res) => {

        // information stored on the request body

        const { username, email, password, phone, address, userType } = req.body;

        const hash = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            uid: uuidv4(),
            email,
            password: hash,
            phone,
            address,
            userType
        });

        // save the user to the database

        await newUser.save();

        // return a success message

        return res.status(201).json({ message: 'User created successfully' });

        // check if the user already exists in the database

        // try {
        //
        //     await admin.auth().getUserByEmail(email);
        //
        // } catch (error) {
        //
        //     if (error.code === 'auth/user-not-found') {
        //
        //         // hash the password
        //
        //         const hash = await bcrypt.hash(password, 10);

                // create a new user

             //  try {
                   // const firebaseUser = await admin.auth().createUser({
                   //     email,
                   //     password,
                   //     emailVerified: false,
                   //     disabled: false
                   // });

                   //console.log(firebaseUser.uid);

                   // Extract uid from the firbaseuser object
                  // const uid = firebaseUser.uid;


                   // const newUser = new User({
                   //     username,
                   //        uid: uuidv4(),
                   //     email,
                   //     password: hash,
                   //     phone,
                   //     address,
                   //     userType
                   // });

                   // save the user to the database

                  // await newUser.save();

                   // return a success message

                 //  return res.status(201).json({ message: 'User created successfully' });


        //        }catch (error) {
        //            console.log('Error creating user', error);
        //              return res.status(500).json({ message: 'Error creating user'});
        //        }
        //
        //     } else {
        //
        //         return res.status(400).json({ message: 'User already exists' });
        //
        //     }
        //
        //
        //
        // }



    }

};
