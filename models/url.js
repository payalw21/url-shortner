const mongoose = reuire("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;