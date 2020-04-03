const express = require('express');
var router = express.Router();

const Employee = require('../model/employeeDTO')
router.get('/employees', (req, res, next)=>{
   Employee.find(function(err, employees){
       if(err){
           res.json(err);
       }
       else{
           res.json(employees);
       }
   })
})

router.post('/addEmployee', (req, res, next)=>{
    // to do
    let newEmployee = new Employee({
        empId: req.body.empId,
        fullName: req.body.fullName,
        email: req.body.email,
        DOB: req.body.DOB,
        mobile: req.body.mobile,
        gender: req.body.gender,
        Address: req.body.Address
    });
newEmployee.save((err, employee)=>{
    if(err){
        res.json(err);
    }
    else{
        res.json({message: "Employee has been added successfully"});
    }
})

})

router.put('/employee/:id', (req, res, next)=>{
    Employee.findOneAndUpdate({_id: req.params.id},{
        $set:{
        empId: req.params.empId,
        fullName: req.body.fullName,
        email: req.body.email,
        DOB: req.body.DOB,
        mobile: req.body.mobile,
        gender: req.body.gender,
        Address: req.body.Address
        }
    }, function(result, err){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
            res.send("employee updated successfully")
        }
    })
})

router.delete('/employee/:id', (req, res, next)=>{
    Employee.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result)
        }
    })
})


module.exports = router;
