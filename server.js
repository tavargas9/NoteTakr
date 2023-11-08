const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();