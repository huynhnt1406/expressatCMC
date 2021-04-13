const express = require('express');
const path = require('path')
const app = express()
const exhpbs = require('express-handlebars')
const members = require('./Members')
//handlebars Middlewars

app.engine('handlebars',exhpbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars')
//middleware
const logger = require('./middleware/logger')
app.use(logger)
//body parse
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/', (req,res) => res.render('index',{
    titleWeb: 'Members Application',
    members 
}));
//static file
app.use(express.static(path.join(__dirname,'public')))

//members api routes
app.use('/api/members',require('./routes/api/members'))
const PORT = process.env.PORT || 3000

app.listen(PORT,() => console.log(`Server listening on PORT : ${PORT}`))