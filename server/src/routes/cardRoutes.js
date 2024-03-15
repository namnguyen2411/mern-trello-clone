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
router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'Update a card' })
})

// METHOD: DELETE
// ENDPOINT: /api/cards/:id
// DESCRIPTION: Delete a card
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Delete a card' })
})

export default router
