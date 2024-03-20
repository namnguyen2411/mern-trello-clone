import express from 'express'
import columnValidation from '#src/validations/columnValidation.js'
import columnController from '#src/controllers/columnController.js'

const router = express.Router()

// METHOD: POST
// ENDPOINT: /api/columns
// DESCRIPTION: Create a new column
router.post('/', columnValidation.createNew, columnController.createNew)

// METHOD: PUT
// ENDPOINT: /api/columns/:id
// DESCRIPTION: Update a column
router.put('/:id', columnValidation.update, columnController.update)

// METHOD: DELETE
// ENDPOINT: /api/columns/:id
// DESCRIPTION: Delete a column
router.delete('/:id', columnValidation.deleteColumn, columnController.deleteColumn)

export default router
