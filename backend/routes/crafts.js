const express = require ('express')

const router = express.Router();

// Import controllers
const {
    getCrafts,
    createCraft,
} = require('../controllers/craftController')


// Get all Crafts
router.get('/', getCrafts)

// Create Craft
router.post('/', createCraft)

module.exports = router;