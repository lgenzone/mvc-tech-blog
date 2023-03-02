const express = require('express');
const path = require('path');

const sequelize = require('./config/connection');

const app = express(); 
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`App started in Port ${PORT}`);
    })
});