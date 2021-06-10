const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Model = require('../models/models');

router.get('/',async (req,res) => {
    try{
        const model = await Model.find();
        res.json(model);
    } catch(err){
        res.json({message: err});
   }
})

router.post('/',async (req,res) => {
    const model = new Model({
        piece: req.body.piece,
        position: {
            posX:req.body.position.posX,
            posY:req.body.position.posY
    }});
    try {
        const savedModel = await model.save();
        res.json(savedModel);
    } catch(err){
         res.json({message: err});
    }
    });

router.get('/:id',async (req,res) => {
    try {
        const piece = await Model.findByID(req.params.id);
        res.json(piece);
    }catch(err){
        res.json({message: err});
   }
})

router.patch('/:id', async (req,res) => {
    try {
        const updateId = await Model.updateOne(
            {_id: req.params.id},
            {$set: {position: req.body.position}});
        res.json(updateId);
    }catch(err){
        res.json({message: err});
   }
})

router.delete('/:id', async (req,res) => {
    try {
        const removeId = await Model.remove({_id:req.params.id});
        res.json(removeId);
    }catch(err){
        res.json({message: err});
   }
})

module.exports = router;