import { Router } from 'express';
import User from './app/models/user';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Alexandre Pinheiro',
    email: 'a@gmail.com',
    password_hash: '1234567',
  });

  // return res.json({ message: 'Hello Go Barber' });
  return res.json(user);
});

// module.exports = routes;
export default routes;
