const passport = require("passport");
const User = require("../model/userAuth");
const LocalStrategy = require("passport-local").Strategy

passport.use(new LocalStrategy( async (username,password,done)=>{
    try {
        let user = await User.findOne({username})

        if(user){
            if(user.passport == password){
                return done(null,user)
                console.log("passport")
            }else{
                return done(null,false)
            }
        }else{
            return done(null,false)
        }
    } catch (error) {
        return done(error,false)
    }
}))

passport.serializeUser(async (user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    let user = await User.findById(id)
    return done(null,user)
})