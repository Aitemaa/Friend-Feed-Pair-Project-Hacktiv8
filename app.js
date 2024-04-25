const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});