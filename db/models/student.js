'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('students', {
    firstName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    }
});

Student.beforeCreate((studentInstance, optionsObject) => {
    let firstChar = studentInstance.firstName[0].toUpperCase()
    let end = studentInstance.firstName.slice(1)
    studentInstance.firstName = firstChar+end
  })

Student.beforeCreate((studentInstance, optionsObject) => {
    let firstChar = studentInstance.lastName[0].toUpperCase()
    let end = studentInstance.lastName.slice(1)
    studentInstance.lastName = firstChar+end
  })


module.exports = Student;
