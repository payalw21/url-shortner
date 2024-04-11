const express = require("express");
const urlRoute = require("./routers/url");
const { connectToMongoDB } = require("./connection");
const path = require("path");
const URL = require("./models/url");
const staticRouter = require("./routers/staticRouter");
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://0.0.0.0:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.get("/url", async (req, res) => {
  const allURL = await URL.find({});
  return res.render("home", {
    urls: allURL,
  });
});

app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server strted at PORT ${PORT}`));
