const User = require('../models/User')
const bcrypt = require('bcrypt')
module.exports = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}, async (err,user) => {
    if(user){
      const validatePassword = await bcrypt.compare(password, user.password);
      if(validatePassword){
        req.session.userId = user._id;
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    }else{
      return res.redirect("/login");
    }
  })
};