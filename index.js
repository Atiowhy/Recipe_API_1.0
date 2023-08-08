require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Router = require('./src/router');
const app = express();
const port = 4000;
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// app.get('/', (req,res) =>{
//     res.status(200).json({'status': 200, 'massage':'server running'})
// })

app.use(Router);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
