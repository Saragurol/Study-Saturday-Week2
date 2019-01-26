const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', async (req, res, next)=>{
    try {
        const allTests = await Test.findAll()
        res.json(allTests)
        
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const paramId = req.params.id 
        const testById = await Test.findById(paramId)
        res.json(testById)
    } catch (error) {
        next(error)
    }
})

router.post('/student/:studentId', async (req, res, next)=>{
    try {
        const newTest = await Test.create({
            subject: 'Outdoor Wilderness Survival',
            grade: 43,
          })
          //create test

        const findStudent = await Student.findById(req.params.studentId)
        //find studnet

        newTest.setStudent(findStudent)
        //assign test to student 
 
        res.status(201).json(newTest)
        
    } catch (error) {
        next(error)
    }
})
  
router.delete('/:id', async (req, res, next)=>{
    try {
        paramId = req.params.id
        await Test.destroy({
            where:{
                id: paramId
            }
        })
        res.status(204).json()

    } catch (error) {
        next(error)
    }
})

module.exports = router;
