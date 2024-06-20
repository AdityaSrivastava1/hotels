const express = require("express");
const router  = express.Router();

const menuItem = require("../models/menuItem");



// For menu items

router.post("/" , async (req,res) =>{
    try {

        const data  = req.body;
        const newItem = new menuItem(data);

        const savedItem = await newItem.save();
        console.log("item saved")
        res.status(200).json(savedItem);
        
    } catch (error) {
        comsole.log("internal server error");
        res.status(500).json({error:`internal server error`});
        
    }
});

router.get("/", async(req,res) => {
    try {
        const data  = await menuItem.find();
        console.log("data fetched successfully");
        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching person :', error);
    res.status(500).json({ error: 'Internal server error' });
    }
})

router.get("/:taste" , async (req,res) => {
    try {
        const tasteType = req.params.taste;
        if(tasteType == 'sweet' || tasteType =='spicy' || tasteType=='sour')
            {
                const response = await menuItem.find({taste: tasteType});
                console.log('response fetched ');
                res.status(200).json(response);
            }
            else
            {
                res.status(404).json({error:'Invalid work type'});
            }
        
        
    } catch (error) {
        console.error('Error fetching person :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//UPDATION
router.put('/:id',async(req,res) =>{
    try {
        const personId = req.params.id;//extract id from URL parameter
        const updatePersonData = req.body; //updated data for the person

        const  response = await menuItem.findByIdAndUpdate(personId,updatePersonData,{
            new:true,//return the updated document
            runValidators:true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu not found'
            });
        }
        console.log('data updated 🙌');
        res.status(200).json(response);
    } 
     catch (error) {
        console.error('Error fetching person :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//DELETION
router.delete('/:id',async(req,res) =>{
    try {
        const personId = req.params.id;//extract id from URL parameter
        const deletePersonData = req.body; //updated data for the person

        const  response = await menuItem.findByIdAndDelete(personId,deletePersonData,{
            new:true,//return the updated document
            runValidators:true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found'
            });
        }
        console.log('data deleted 💣');
        res.status(200).json({message:'Item  Deleted Successfully 💣'});
    } 
     catch (error) {
        console.error('Error fetching person :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
