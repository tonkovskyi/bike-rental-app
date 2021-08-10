const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

app.use(express.static('./front-end/public'));


app.use(express.json({ extended: true} ));
app.use('/api/bike/available', require('./routes/bike.available.route'));
app.use('/api/bike/rented', require('./routes/bike.rented.route'));

const PORT = config.get('port') || 5000;

async function start(){
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App started on port ${PORT}`));
    } catch (e){
        console.log('Server error', e.message);
        process.exit(1)
    }
}

start();
