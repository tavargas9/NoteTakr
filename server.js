const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

//npm package for creating a unique identifier
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware to parse JSON and URL Encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware to serve assets in the public folder
app.use(static('public'));