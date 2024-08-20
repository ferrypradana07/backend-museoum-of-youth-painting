const express = require('express')

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const usersRoutes = require('./usersRoutes')
const imagesRoutes = require('./imagesRoutes')
const imageRoutes = require('./imageRoutes')
const cdnRoutes = require('./cdnRoutes')
const likeRoutes = require('./likeRoutes')
const collectionRoutes = require('./collectionRoutes')
const collectionsRoutes = require('./collectionsRoutes')
const notificationsRoutes = require('./notificationsRoute')
const followerRoutes = require('./followerRoutes')
const devRoutes = require('./devRoutes')
const contactRoutes = require('./contactusRoutes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/dev', devRoutes)
router.use('/cdn', cdnRoutes)
router.use('/api/user', userRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/image', imageRoutes)
router.use('/api/images', imagesRoutes)
router.use('/api/collection', collectionRoutes)
router.use('/api/collections', collectionsRoutes)
router.use('/api/like', likeRoutes)
router.use('/api/notifications', notificationsRoutes)
router.use('/api/follower', followerRoutes)
router.use('/api/contactus', contactRoutes)


module.exports = router