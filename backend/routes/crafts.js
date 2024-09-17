const express = require ('express')

const router = express.Router();

const multer = require('multer')
const path = require('path')

const stroage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});

const upload = multer({ storage });public

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
router.post('/', upload.single('image'), createCraft)

// Delete Craft
router.delete('/:id', deleteCraft)

// Update Craft
router.patch('/:id', updateCraft)

module.exports = router;