import express from 'express'

const router = express.Router()

// METHOD: GET
// ENDPOINT: /api/columns
// DESCRIPTION: Get all columns
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all columns' })
})

// METHOD: POST
// ENDPOINT: /api/columns
// DESCRIPTION: Create a new column
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create a new column' })
})

// METHOD: PUT
// ENDPOINT: /api/columns/:id
// DESCRIPTION: Update a column
router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'Update a column' })
})

// METHOD: DELETE
// ENDPOINT: /api/columns/:id
// DESCRIPTION: Delete a column
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Delete a column' })
})

export default router
