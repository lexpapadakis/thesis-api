const express = require("express");
const fileUpload = require("express-fileupload");

const videoManiputlation = require("./utils/videoManipulation");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/apiTest/",
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Test
app.get("/metadata", async (req, res) => {
  try {
    const metadata = await videoManiputlation();
    return res.json(metadata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.post("/upload", async (req, res) => {
  try {
    // console.log(req.files.file); // the uploaded file object
    console.log("files", req.files);
    const file = req.files.file;
    const metadata = await videoManiputlation(file);
    return res.json(metadata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);

  console.log("Api Started!");
});
