const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || config.get('port') || 5000;

//for development
// app.use(cors());

app.use(express.json({ extended: true }));

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/routes', require('./routes/supRoutes.routes'));
app.use('/event', require('./routes/events.routes'));
app.use('/detail-route', require('./routes/supRoutesDetail'));
app.use('/detail-event', require('./routes/eventsDetail.routes'));
app.use('/change-route', require('./routes/supRoutesChange'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();