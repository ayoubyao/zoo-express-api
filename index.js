const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3010;
const animal = require("./routes/animal");
const avis = require("./routes/avis");
const habitat = require("./routes/habitat");
const race = require("./routes/race");
const rapportveterinaire = require("./routes/rapportveterinaire");
const role = require("./routes/role");
const security = require("./routes/security");
const service = require("./routes/service");
const utilisateur = require("./routes/utilisateur");

const corsOptions = {
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/animal", animal);
app.use("/avis", avis);
app.use("/habitat", habitat);
app.use("/race", race);
app.use("/rapportveterinaire", rapportveterinaire);
app.use("/role", role);
app.use("/security", security);
app.use("/service", service);
app.use("/utilisateur", utilisateur);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server started!`);
});
