import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import ApiManager from "./apiManager"
import { useState, useEffect } from "react"
import moment from "moment"

const apiManager = ApiManager.getInstance()

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedNoteID, setSelectedNoteID] = useState("")

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    apiManager
      .get("/notes")
      .then((response) => {
        setNotes(response.result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const resetForm = () => {
    setContent("")
    setTitle("")
    setSelectedNoteID("")
  }

  const saveNote = () => {
    apiManager
      .post("/notes", { title, content })
      .then((data) => {
        if (!data.errors) {
          document.getElementById("exampleModal").click()
          getNotes()
          resetForm()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateNote = () => {
    apiManager
      .patch("/notes", { title, content, noteId: selectedNoteID })
      .then((data) => {
        if (!data.errors) {
          document.getElementById("exampleModal").click()
          getNotes()
          resetForm()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editNote = (index) => {
    const selectedNote = notes[index]
    setSelectedNoteID(selectedNote._id)
    setTitle(selectedNote.title)
    setContent(selectedNote.content)
  }

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      apiManager
        .delete("/notes", { noteId: id })
        .then((data) => {
          if (!data.errors) {
            getNotes()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      // handle cancellation
    }
  }

  return (
    <div className="tableView">
      <div className="container-fluid">
        <h2 className="mb-5">Notes Table</h2>
        <button
          className="btn-large btn btn-primary mb-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Note
        </button>
        <table className="table table-striped table-borderes">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes?.map((note, index) => (
              <tr key={note._id}>
                <th scope="row">{index + 1}</th>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>{moment.unix(note.createdAt).format("LLL")}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => editNote(index)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteNote(note._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 d-flex flex-column">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="col-sm-2 col-form-label"
                >
                  Note Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                />
              </div>
              <div className="mb-3 d-flex flex-column">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="col-sm-3 col-form-label"
                >
                  Note Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Content"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => resetForm()}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={saveNote}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 d-flex flex-column">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="col-sm-2 col-form-label"
                >
                  Note Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                />
              </div>
              <div className="mb-3 d-flex flex-column">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="col-sm-3 col-form-label"
                >
                  Note Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Content"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => resetForm()}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateNote}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
