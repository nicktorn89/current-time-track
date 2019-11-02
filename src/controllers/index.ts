import express = require('express');
const path = require('path');

const tasks = require('./tasks');

const router = express.Router();

router.use('/api', tasks);

export = router;
