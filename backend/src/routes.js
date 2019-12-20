const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

/* routes.post('/users', (req, res) => {
  return res.json(req.body);
}); */

const message = {
  name: 'Teste',
  message: 'Teste de servidor NodeJS!',
};

routes.get('/', (req, res) => {
  return res.json(message);
});

routes.put('/users/:id', (req, res) => {
  return res.json({ id: req.params.id });
});

routes.post('/sessions', SessionController.store);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;
