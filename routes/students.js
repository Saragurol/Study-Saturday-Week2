const router = require('express').Router();
const Student = require('../db/models/student')

router.get('/', async (req, res, next)=>{
    try {
        const allStudents = await Student.findAll()
        res.json(allStudents)

    } catch (error) {
        next(error) 
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const paramId = req.params.id
        const studentWithId = await Student.findById(paramId)
        if(studentWithId){
            res.json(studentWithId)
        }else{
            res.status(404).send("student not found")
        }
       // try catch block wont catch error if student with ID is not found so we need to make and if/else statement

    } catch (error) {
        // something that we didnt expect will come up here. Ex someone smashes ur laptop
        next(error) 
    }
})

router.post('/', async (req, res, next)=>{
    try {
        const paramBody = req.body
        const postThisStudent = await Student.create(paramBody)
        res.status(201).json(postThisStudent)
        //dont need to send the newly created student

    } catch (error) {
        // console.log("IM THE ERROR #", error)
        next(error) 
    }
})

router.put('/:id', async (req, res, next)=>{
    try {
        const paramId = req.params.id
        const paramBody = req.body
        const updateThisStudent = await Student.update(paramBody, {
            where: {id: paramId},
            returning: true,
            plain: true
        })
        res.status(200).json(updateThisStudent[1])
        // Takes two parameters: the first parameter contains the info you want to update. The second parameter contains the query for which instances to update. Thats why we need to put the [1]

    } catch (error) {
        next(error) 
    }
})

router.delete('/:id', async (req, res, next)=>{
    try {
        const paramId = req.params.id
        // const paramBody = req.body
        const deletedStudent = await Student.destroy({
            where: {id: paramId},
            returning: true,
            plain: true
        })
        res.status(204).json()

    } catch (error) {
        next(error) 
    }
})

module.exports = router;

