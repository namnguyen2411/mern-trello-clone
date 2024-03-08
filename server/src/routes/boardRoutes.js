import express from 'express'
import boardValidation from '#src/validations/boardValidation.js'
import boardController from '#src/controllers/boardController.js'

const router = express.Router()

// METHOD: GET
// ENDPOINT: /api/boards
// DESCRIPTION: Get all boards
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all boards' })
})

// METHOD: POST
// ENDPOINT: /api/boards
// DESCRIPTION: Create a new board
router.post('/', boardValidation.createNew, boardController.createNew)

// METHOD: GET
// ENDPOINT: /api/boards/:id
// DESCRIPTION: Get a board
router.get('/:id', boardController.getDetails)

// METHOD: PUT
// ENDPOINT: /api/boards/:id
// DESCRIPTION: Update a board
router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'Update a board' })
})

// METHOD: DELETE
// ENDPOINT: /api/boards/:id
// DESCRIPTION: Delete a board
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Delete a board' })
})

export default router
