const express = require('express');
const path = require('path');
const controller = require('./controllers');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({});

const sequelize = require('./config/connection');

const app = express(); 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`App started in Port ${PORT}`);
    })
});