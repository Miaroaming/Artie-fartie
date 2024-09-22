
const Craft = require ('../models/craftModel')

const mongoose = require('mongoose')

// Get All Crafts

const getCrafts = async (req, res) => {

    try {
        const crafts = await Craft.find({}).populate({
            path: 'comments',
            model:'Comment'
        }).sort({createdAt: -1})

        res.status(200).json(crafts)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error!'})
    }
}

// Get Single Craft

const getCraft = async ( req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Craft'})
    }

    try {
        const craft = await Craft.findById(id).populate({
            path: 'comments',
            model: 'Comment'
        });

    if(!craft) {
        return res.status(404).json({error: 'No such Craft'})
    }

    res.status(200).json(craft);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }   
}


// Post Craft

const createCraft = async ( req, res) => {
    const { title, type, description, price, notForSale, anonymous, materials, user_id} = req.body

    const imageFilename = req.file ? req.file.filename : null;

    try {
        const craft = await Craft.create({ title, type, description, price, notForSale, anonymous, materials, user_id, imageURL: imageFilename})
        res.status(200).json(craft)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete Craft

const deleteCraft = async ( req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Craft'})
    }

    const craft = await Craft.findOneAndDelete({_id: id})

    if(!craft) {
        return res.status(404).json({error: 'No such Craft'})
    }

    res.status(200).json(craft)
}

// Update a Craft

const updateCraft = async ( req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Craft'})
    }

    const craft = await Craft.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!craft) {
        return res.status(404).json({error: 'No such Craft'})
    }

    res.status(200).json(craft)
}

module.exports = {
    getCrafts,
    getCraft,
    createCraft,
    deleteCraft,
    updateCraft
};