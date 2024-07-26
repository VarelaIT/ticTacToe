import Express from "express";
import Path from "path";

const port = 3456;
const app = Express();

app.use("/", Express.static(Path.join(__dirname, "../static")));

app.listen(port, () => {
  console.log(`Server up and running in port ${port}`);
});
