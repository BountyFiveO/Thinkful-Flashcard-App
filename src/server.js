[const express = require('express');
const cors = require('cors');
const data = require('../data/db.json');
]
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5001;

router.get('/', cors(), (req, res) => {
  res.json(data);
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
});

module.exports = app;