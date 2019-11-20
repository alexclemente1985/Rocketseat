const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkProjectExistence(req, res, next) {
  if (!req.body.title) {
    return res
      .status(400)
      .json({ error: "Project not found on request body!" });
  }

  return next();
}

function checkProjectId(req, res, next) {
  const project = projects[req.params.id];

  if (!project) {
    return res.status(400).json({ error: "Project doesn't exists!" });
  }

  return next();
}

function checkProjectTask(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "No tasks available" });
  }

  return next();
}

function requestCounter(req, res, next) {
  console.count("Request counter");

  return next();
}

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

server.use(requestCounter);

server.get("/projects", (req, res) => {
  //return res.json({
  //  message: "teste get all"
  //});
  return res.json(projects);
});

server.post("/projects", checkProjectExistence, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.post(
  "/projects/:id/tasks",
  checkProjectId,
  checkProjectTask,
  (req, res) => {
    //return res.json({
    //  message: "teste post tasks"
    //});
    const { id } = req.params.id;
    const { title } = req.body;

    const project = projects[req.params.id]; //.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(projects);
  }
);

server.put("/projects/:id", checkProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectIndex = req.params.id;

  projects[projectIndex].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = req.params.id;

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.listen(3000);
