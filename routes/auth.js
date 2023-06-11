const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../model/user');
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const{registerValidation, loginValidation}=require('../validation')

//REGISTER
router.post('/register', async (req, res) => {
  try {
    // Validating user input
    
const {error}=registerValidation(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //checking if user already exists
const emailExist=await User.findOne({email: req.body.email})
if (emailExist) return res.status(400).json({error:'email already exists'})

//hashing the pasword
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(req.body.password, salt)
//create new user
    const { name, email, password } = req.body;
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'User not registered', message: error.message });
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  // Validating user input
    
const {error}=loginValidation(req.body)
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}
  //checking if user already exists
const user=await User.findOne({email: req.body.email})
if (!user) return res.status(400).json({error:'email doesnt exist'})

//checking if password is correct
const validPass=await bcrypt.compare(req.body.password, user.password)
if(!validPass) return res.status(400).json({error: 'invalid password'})

//create and assign token
const token=jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.header('auth-token', token).send(token)

});

module.exports = router;
