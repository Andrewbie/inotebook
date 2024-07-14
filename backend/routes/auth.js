const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchuser')

const JWT_SECRET = 'shanudoinggreat'

// ROUTE 1: creating a user using: POST "/api/auth/createuser" create user, no login
router.post('/createuser',[
    body('name','Enter a valid Name').isLength({ min: 3 }),                    
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid Pasword').isLength({min:5})
] ,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try{
    let user = await User.findOne({email:req.body.email});

    if(user){
      return res.status(400).json({error:"User with this mail already exists"})
    }

        const salt = await bcrypt.genSalt(10)
        const secPass =  await bcrypt.hash(req.body.password,salt)

        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      const data = {
        user:{
          id:user.id
        }
      }
      success = true
      const authToken = jwt.sign(data,JWT_SECRET)
      res.json({success,authToken})
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("some error occurred")
    }

})

// ROUTE: 2 logging in a user using: POST "/api/auth/login"  no login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password can not be blank').exists()
] ,async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
      let user = await User.findOne({email})
      if(!user){
        success = false
        return res.status(400).json({successs, error:"Try to login with correct Credintials"})
      }

      const passwordCompare = await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        success = false
        return res.status(400).json({success, error:"Try to login with correct credentials"})
      }

      const data = {
        user:{
          id:user.id
        }
      }
      success = true
      const authToken = jwt.sign(data,JWT_SECRET)
      res.json({success, authToken})

    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error")
    }
  })


    // ROUTE: 3 getting user detail a user using: POST "/api/auth/getuser"  no login required
    router.post('/getuser',fetchUser, async(req,res)=>{
      const errors = validationResult(req);
    try {
      const userid = req.user.id
      const user = await User.findById(userid).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error")
    }
  })

module.exports = router;