let mongoose = require("mongoose")
let Schema = mongoose.Schema

let notes = new Schema({
  title: { type: String },
  content: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
})

const Notes = mongoose.model("notes", notes)

module.exports = Notes
