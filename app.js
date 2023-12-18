// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');
const collectorRoutes = require('./routes/collector-routes.js');
const orderRoutes = require('./routes/order-routes.js');
const contentRoutes = require('./routes/content-routes.js');
const facilityRoutes = require('./routes/facility-routes.js');

app.get('/', (req, res) => {
    res.send('Hello, this is Bersih.Kan API!');
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/collectors', collectorRoutes);
app.use('/orders', orderRoutes);
app.use('/contents', contentRoutes);
app.use('/facility', facilityRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
