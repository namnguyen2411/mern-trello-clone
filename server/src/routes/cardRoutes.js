import express from 'express'
import cardValidation from '#src/validations/cardValidation.js'
import cardController from '#src/controllers/cardController.js'

const router = express.Router()

// METHOD: POST
// ENDPOINT: /api/cards
// DESCRIPTION: Create a new card
router.post('/', cardValidation.createNew, cardController.createNew)

// METHOD: PUT
// ENDPOINT: /api/cards/:id
// DESCRIPTION: Update a card
router.put('/:id', cardValidation.update, cardController.update)

// METHOD: DELETE
// ENDPOINT: /api/cards/:id
// DESCRIPTION: Delete a card
router.delete('/:id', cardValidation.deleteCard, cardController.deleteCard)

export default router
