const express=  require("express");
const router = express.Router();
const Person = require("../models/person");

// app.post("/person"  , function (req,res){
//     const data = req.body ; //Assuming req body contains the Person's data

//     //create a new person document using the mongoose model
//     const newPerson = new Person(data);
//     // newPerson.name = data.name;
//     // newPerson.age = data.age;

//     //save the new person to the database
//     newPerson.save((error,savedPerson) => {
//         if(error){
//             console.log('Error saving Person' , error);
//             res.status(500).json({error:`internal server error`})
//         }
//         else
//         {
//             console.log("data saved successfully");
//             res.status(200).json(savedPerson);
//         }
//     })

// })

//fethcing details from server jo form mae bhara and saving to db
router.post('/', async (req, res) => {
    try {
    const newPersonData = req.body;
    const newPerson = new Person(newPersonData);
    // Save the new person to the database using await
    const savedPerson = await newPerson.save();
    console.log('Saved person to database');
    res.status(201).json(savedPerson);
    } 
    catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });


//getting the details of a person from database 
router.get('/',async(req,res) => {
    try {
        const data  = await Person.find();
        console.log("data fetched successfully");
        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching person :', error);
    res.status(500).json({ error: 'Internal server error' });
    }
})


router.get('/:workType' , async(req,res) => {
    try {
        const workType = req.params.workType;//extract worktype from url parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response  = await Person.find({work:workType});
            console.log('response fetched');
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

        const  response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,//return the updated document
            runValidators:true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found'
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

        const  response = await Person.findByIdAndDelete(personId,deletePersonData,{
            new:true,//return the updated document
            runValidators:true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found'
            });
        }
        console.log('data deleted 💣');
        res.status(200).json({message:'Person Deleted Successfully 💣'});
    } 
     catch (error) {
        console.error('Error fetching person :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;