import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Go Barber" });
});

//module.exports = routes;
export default routes;
