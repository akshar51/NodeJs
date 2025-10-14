const express = require('express')
const dotenv = require('./config/config.env')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user.route')
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const port = dotenv.PORT || 1999
const app = express()



app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.set('view engine','ejs')
app.use(express.static('public'))

app.use('/',require('./routers'))
app.use('/api/user',userRouter)



app.listen(port,(err)=>{
    if(!err){
        db()
        console.log("Server start on port "+port)
        console.log("http://localhost:"+port)
    }
})