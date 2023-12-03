const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/images" });


mongoose
  .connect(
    "mongodb+srv://elliemmaynard:Butterfly2003@cluster0.d0a8bwu.mongodb.net/"
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/feedback.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/clothing.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/basics.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/clothing-favs.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/jewelry.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/products.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/rings.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/skincare.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/ursa.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/lounge.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dresses.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/necklaces.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/bracelets.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/makeup.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/shower.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/paulaschoice.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/rhodeskin.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/jewelry-favs.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/native.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/cerave.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/charlottetillbury.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/maybelline.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/onesize.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/tarte.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/olaplex.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/products-favs.html");
});

const feedbackSchema = new mongoose.Schema({
  name: String,
  brand: String,
  rating: String,
  reviews: [String],
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/api/feedbacks", (req, res) => {
  getFeedbacks(res);
});

const getFeedbacks = async (res) => {
  const feedbacks = await Feedback.find();
  res.send(feedbacks);
};

app.post("/api/feedbacks", upload.single("img"), (req, res) => {
  const result = validateFeedback(req.body);

  if (result.error) {
    console.log("validation error" + result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const feedback = new Feedback({
    name: req.body.name,
    brand: req.body.brand,
    rating: req.body.rating,
    reviews: req.body.reviews.split(","),
  });


  createFeedback(feedback, res);
});

const createFeedback = async (feedback, res) => {
  const result = await feedback.save();
  res.send(feedback);
};

app.put("/api/feedbacks/:id", upload.single("img"), (req, res) => {
  const result = validateFeedback(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  updateFeedback(req, res);
});

const updateFeedback = async (req, res) => {
  let fieldsToUpdate = {
    name: req.body.name,
    brand: req.body.brand,
    rating: req.body.rating,
    reviews: req.body.reviews.split(","),
  };


  const result = await Feedback.updateOne({ _id: req.params.id }, fieldsToUpdate);
  const feedback = await Feedback.findById(req.params.id);
  res.send(feedback);
};

app.delete("/api/feedbacks/:id", upload.single("img"), (req, res) => {
  removeFeedback(res, req.params.id);
});

const removeFeedback = async (res, id) => {
  const feedback = await Feedback.findByIdAndDelete(id);
  res.send(feedback);
};

const validateFeedback = (feedback) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    reviews: Joi.allow(""),
    name: Joi.string().min(3).required(),
    brand: Joi.string().min(3).required(),
    rating: Joi.string().min(3).required(),
  });

  return schema.validate(feedback);
};

app.listen(3000, () => {
  console.log("I'm listening");
});