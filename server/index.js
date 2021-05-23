const express = require('express');


const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

require('./routes/queries')(app);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});