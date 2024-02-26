const express = require("express")
const router = express.Router()
const config = require("config")
const { validationResult } = require("express-validator")
const Notes = require("../models/notes")
const { validateNote } = require("../validators/notes")
const moment = require("moment")

function getNotes(req, res) {
  const errors = validationResult(req)
  if (errors.errors.length !== 0) {
    return res.send({ errors: errors.errors })
  }

  Notes.find((err, result) => {
    if (err) return res.send({ message: 2010, err })
    return res.send({ message: 2015, result })
  })
}

function addNote(req, res) {
  const errors = validationResult(req)
  if (errors.errors.length !== 0) {
    return res.send({ errors: errors.errors })
  }

  req.body.status = 1
  req.body.createdAt = moment().unix()
  let note = new Notes(req.body)

  note.save((err, result) => {
    if (err && err.code === 11000) {
      if (err.keyPattern.email == 1) return res.send({ message: 2016 })
      if (err.keyPattern.phone == 1) return res.send({ message: 2017 })
    }
    if (err) return res.send({ message: 2010, err })
    return res.send({ message: 2018, result })
  })
}

function updateNote(req, res) {
  const errors = validationResult(req)
  if (errors.errors.length !== 0) {
    return res.send({ errors: errors.errors })
  }
  Notes.findOne({ _id: req.body.noteId }, (err, result) => {
    if (err) return res.send({ message: 2010, err })
    else {
      req.body.updatedAt = moment().unix()
      Object.assign(result, req.body).save((err, updated) => {
        if (err) return res.send({ message: 2010, err })
        else return res.send({ message: 2019, updated })
      })
    }
  })
}

//DELETE USER
function deleteNote(req, res) {
  const errors = validationResult(req)
  if (errors.errors.length !== 0) {
    return res.send({ errors: errors.errors })
  }

  Notes.findOneAndDelete({ _id: req.body.noteId }, (err, result) => {
    if (err) return res.send({ message: 2010 })
    else return res.send({ message: 2020, result })
  })
}

router.post("/notes", validateNote("addNote"), addNote)
router.get("/notes", getNotes)
router.patch("/notes", validateNote("updateNote"), updateNote)
router.delete("/notes", validateNote("deleteNote"), deleteNote)

module.exports = { router }
