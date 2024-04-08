import express from 'express'
import userValidation from '#src/validations/userValidation.js'
import userController from '#src/controllers/userController.js'

const router = express.Router()

// METHOD: GET
// ENDPOINT: /api/users/:id
// DESCRIPTION: Get a user profile
router.get('/:id', userController.getProfile)

// METHOD: POST
// ENDPOINT: /api/users/signup
// DESCRIPTION: Create a new user
router.post('/signup', userValidation.createNew, userController.createNew)

// METHOD: POST
// ENDPOINT: /api/users/login
// DESCRIPTION: User login
router.post('/login', userValidation.createNew, userController.login)

// METHOD: POST
// ENDPOINT: /api/users/logout
// DESCRIPTION: User logout
router.post('/logout', userController.logout)

// METHOD: PUT
// ENDPOINT: /api/users/change-password
// DESCRIPTION: Change user password
router.put('/change-password', userValidation.changePassword, userController.changePassword)

// METHOD: PUT
// ENDPOINT: /api/users/:id
// DESCRIPTION: Update a user profile
router.put('/:id', userValidation.update, userController.update)

// METHOD: DELETE
// ENDPOINT: /api/users/:id
// DESCRIPTION: Delete a user
// router.delete('/:id', (req, res) => {
//   res.status(200).json({ message: 'Delete a user' })
// })

export default router
