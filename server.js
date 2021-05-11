const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const htmlRoutes = require('./routes/html-routes.js');
// const apiRoutes = require('./routes/api-routes.js')(app);

app.use('/', htmlRoutes);
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});