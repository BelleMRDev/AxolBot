const fs = require('fs');
const { webport } = require('./config.json');
const express = require('express');
const app = express();
const PORT = webport;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', { title: 'Axol Bot' });
});

app.get('/privacy', (req, res) => {
	res.render('privacy', { title: 'Axol Bot - Privacy Policy' });
});



app.listen(PORT, '0.0.0.0', () => {
	console.log(`Axol Revolt Bot Website - Online - Made by AXOL#6594 on Revolt.chat`);
	console.log(`Webserver Running on port: ${PORT}`);
});