const User = require("../model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

let temUser = {};
let otp = null;

module.exports.homePage = (req, res) => {
  res.render("pages/index");
};

module.exports.signupPage = (req, res) => {
  res.render("pages/signup");
};

module.exports.loginPage = (req, res) => {
  res.render("pages/login");
};

module.exports.verifyOtpPage = (req, res) => {
  res.render("pages/verifyOtp");
};

module.exports.emailConfirmPage = (req, res) => {
  res.render("pages/emailConfirm");
};

module.exports.verifyPage = (req, res) => {
  res.render("pages/verify");
};

module.exports.newPassPage = (req, res) => {
  res.render("pages/newPass");
};

module.exports.signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    temUser = req.body;
    otp = Math.floor(100000 + Math.random() * 900000);

    // Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "aksharparekh401@gmail.com",
        pass: process.env.pass,
      },
    });

    const info = await transporter.sendMail({
      from: "<aksharparekh401@gmail.com>",
      to: req.body.email,
      subject: "OTP Verification",
      html: `<h3>Otp is ${otp}</h3>`, // HTML body
    });

    console.log("Message sent:", info.messageId);

    return res.redirect("/verifyOtp");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.logout = (req, res) => {
  req.logout(() => {
    return res.redirect("/");
  });
};

module.exports.changePassPage = (req, res) => {
  return res.render("pages/changePassword");
};

module.exports.changePass = async (req, res) => {
  let { id } = req.params;
  let { oldpassword, newpassword, confirmpassword } = req.body;
  let user = await User.findById(id);
  let isValid = await bcrypt.compare(oldpassword, user.password);

  if (isValid) {
    if (newpassword == confirmpassword) {
      user.password = await bcrypt.hash(newpassword, 10);
      await user.save();
      console.log("Password change successfully...");
      req.flash("success", "Password change successfully...");
      res.redirect("/login");
    } else {
      req.flash("error", "New and Confirm password not match..");
      console.log("New and Confirm password not match..");
      res.redirect(req.get("Referrer" || "/"));
    }
  } else {
    req.flash("error", "Old password not match...");
    console.log("Old password not match...");
    res.redirect(req.get("Referrer" || "/"));
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    if (otp == req.body.otp) {
      await User.create({ ...temUser });
      res.redirect("/login");
    } else {
      console.log("Otp not correct");
      res.redirect(req.get("Referrer") || "/");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.emailConfirm = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    temUser = user;
    console.log(user)
    if (user) {
      otp = Math.floor(100000 + Math.random() * 900000);

      // Nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "aksharparekh401@gmail.com",
          pass: process.env.pass,
        },
      });

      const info = await transporter.sendMail({
        from: "<aksharparekh401@gmail.com>",
        to: user.email,
        subject: "OTP Verification",
        html: `<h3>Otp is ${otp}</h3>`, // HTML body
      });
      console.log("Message sent:", info.messageId);
      return res.redirect("/verify");

    }else{
      console.log("Email not found...")
      res.redirect(req.get('Referrer' || '/'))
    }


  } catch (error) {
    console.log(error.message)
    res.redirect(req.get('Referrer' || '/'))
  }
};


module.exports.verify = (req,res)=>{
  if(otp == req.body.otp){
    res.cookie('userId',temUser.id)
    res.redirect('/newPass')
  }else{
    console.log("OTP not match...")
    return res.redirect(req.get("Referrer") || "/");
  }
}

module.exports.newPass = async (req,res)=>{
  try {
    const {newpassword,confirmpassword} = req.body;
    let {userId} = req.cookies

    if(newpassword == confirmpassword){
      let user = await User.findById(userId)
      user.password = await bcrypt.hash(newpassword,10)
      await user.save()
      console.log("Password change successfully...")
      return res.redirect("/login");
      
    }else{
      console.log("New and Confirm password not match...")
      res.redirect(req.get('Referrer' || '/'))
    }
  } catch (error) {
    console.log(error.message)
    res.redirect(req.get("Referrer" || '/'))
  }
}