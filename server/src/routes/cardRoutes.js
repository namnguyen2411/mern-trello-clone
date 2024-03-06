import express from 'express'

const router = express.Router()

// METHOD: GET
// ENDPOINT: /api/cards
// DESCRIPTION: Get all cards
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all cards' })
})

// METHOD: POST
// ENDPOINT: /api/cards
// DESCRIPTION: Create a new card
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create a new card' })
})

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
