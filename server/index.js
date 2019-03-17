'use strict';

const Express = require('express');
const {resolve} = require('path');

const app = new Express();

// Server
let port = process.env.PORT || 3000;

app.get('/', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')));
app.set('port', port);
app.use(Express.static('public'));
app.listen(port, () => console.log(`Listening to port ${port}`))
