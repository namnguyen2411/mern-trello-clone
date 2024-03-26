import express from 'express'
import boardValidation from '#src/validations/boardValidation.js'
import boardController from '#src/controllers/boardController.js'

const router = express.Router()

// METHOD: POST
// ENDPOINT: /api/boards
// DESCRIPTION: Create a new board
router.post('/create', boardValidation.createNew, boardController.createNew)

// METHOD: POST
// ENDPOINT: /api/boards
// DESCRIPTION: Get all boards by ownerId
router.post('/:ownerId', boardValidation.getBoardsByOwnerId, boardController.getBoardsByOwnerId)

// METHOD: GET
// ENDPOINT: /api/boards/:id
// DESCRIPTION: Get a board
router.get('/:id', boardController.getDetails)

// METHOD: PUT
// ENDPOINT: /api/boards/dragging_card
// DESCRIPTION: Update a board after dragging a card to another column
router.put('/dragging_card', boardValidation.dragCardToAnotherColumn, boardController.dragCardToAnotherColumn)

// METHOD: PUT
// ENDPOINT: /api/boards/:id
// DESCRIPTION: Update a board
router.put('/:id', boardValidation.update, boardController.update)

// METHOD: DELETE
// ENDPOINT: /api/boards/:id
// DESCRIPTION: Delete a board
router.delete('/:id', boardController.deleteBoard)

export default router
