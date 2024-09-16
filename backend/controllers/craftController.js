const Craft = require ('../models/craftModel')

const mongoose = require('mongoose')

// Get Crafts

const getCrafts = async (req, res) => {
    const crafts = await Craft.find({}).sort({createdAt: -1})
    res.status(200).json(crafts)
}

// Post Craft

const createCraft = async ( req, res) => {
    const { title, type, description, price, notForSale, anonymous, materials} = req.body

    try {
        const craft = await Craft.create({ title, type, description, price, notForSale, anonymous, materials})
        res.status(200).json(craft)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getCrafts,
    createCraft
}