const { body } = require("express-validator");
module.exports.validateNote = (method) => {
  switch (method) {
    case "addNote": {
      return [
        body("title", "Title is required")
          .exists()
          .trim()
          .isLength({ min: 1 })
          .withMessage("Title can not be empty"),
        body("content", "Content is required")
          .exists()
          .trim()
          .isLength({ min: 1 })
          .withMessage("Content can not be empty"),
      ];
    }
    case "updateNote": {
      return [
        body("noteId", "Note Id is required")
          .exists()
          .trim()
          .isLength({ min: 1 })
          .withMessage("Note Id can not be empty"),
        body("title", "Title is required")
          .exists()
          .trim()
          .isLength({ min: 1 })
          .withMessage("Title can not be empty"),
        body("content", "Content is required")
          .exists()
          .trim()
          .isLength({ min: 1 })
          .withMessage("Content can not be empty"),
      ];
    }
    case "deleteNote": {
      return [
        body("noteId", "Note Id is required")
          .exists()
          .trim()
          .isLength({ min: 1 })
          .withMessage("Note Id can not be empty")
      ]
    }
  }
};
