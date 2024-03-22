import express from 'express'
import boardRoutes from './boardRoutes.js'
import columnRoutes from './columnRoutes.js'
import cardRoutes from './cardRoutes.js'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.use('/boards', boardRoutes)
router.use('/columns', columnRoutes)
router.use('/cards', cardRoutes)
router.use('/users', userRoutes)

export default router
