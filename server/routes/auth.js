
//imports from packages
const express = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");


//import from other screens
const authRouter = express.Router();
const User = require("../models/user");


//signup route
authRouter.post('/api/signup',async (req, res) => {
try
{
console.log('Received signup request:', req.body);
//get data from client
const {name , email , password} = req.body;
if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Name, email, and password are required"
      });
    }

const existingUser = await User.findOne({email});
if(existingUser){
return res.status(400).json({msg: "User with same email already exist"});

}
const hashedPassword = await bcryptjs.hash(password, 8);

let user = new User({email ,password: hashedPassword , name})
user = await user.save();
res.json(user);
}catch(e){
 console.error('Signup error:', e);
res.status(500).json({error: e.message});}

});

//SignIn route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Sign in attempt for:', email);

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

     const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Incorrect password." });
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc });
        //{
        //token :'sometoken'
        //'name': 'priyanshu'
        //'email' : 'a@gmail.com'
        //}

      } catch (e) {
      console.error('Sign in error:', e);
        res.status(500).json({ error: e.message });
      }
    });
    authRouter.post("/tokenIsValid", async (req, res) => {
      try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });

    // get user data
    authRouter.get("/", auth, async (req, res) => {
      const user = await User.findById(req.user);
      res.json({ ...user._doc, token: req.token });
    });





module.exports  = authRouter;