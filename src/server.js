const express = require('express');

const { TrackController } = require('./controllers');

const app = express();

const port = process.env.PORT || 3333;

app.get('/api/track', TrackController.index);

app.listen(port, () => console.log(`Server running at port ${port}`));