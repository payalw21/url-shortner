const express = require("express");
const urlRoute = require("./routers/url");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");
const app = express();
const PORT = 8001;

app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
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



connectToMongoDB("mongodb://0.0.0.0:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.listen(PORT, () => console.log(`Server strted at PORT ${PORT}`));
