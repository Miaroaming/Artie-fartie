const express = require ('express')

const router = express.Router();

// Import controllers
const {
    getCrafts,
    getCraft,
    createCraft,
    deleteCraft,
    updateCraft
} = require('../controllers/craftController')


// Get all Crafts
router.get('/', getCrafts)

// Get single Craft
router.get('/:id', getCraft)

// Create Craft
router.post('/', createCraft)

// Delete Craft
router.delete('/:id', deleteCraft)

// Update Craft
router.patch('/:id', updateCraft)

module.exports = router;