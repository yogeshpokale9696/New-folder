const bcrypt = require('bcrypt')
const conn = require('./config.js');
const express = require('express')
const app = express()
app.set('view-engine', 'ejs')


async function register (req,res) {
    var name =req.body.name
    var username = req.body.usrname
    var email = req.body.email
    var password = req.body.password
    var hashedPassword = await bcrypt.hash(password, 10)

    if(username && password)
    {
      
       let query = `insert into user(name,username,email,pass) values("${name}","${username}","${email}","${hashedPassword}")`;

        conn.query(query, async function(error, data){

            if(data != 0 )
            {
                res.redirect('/login')

                
            }
            else
            {
                res.redirect('/register')
            }
            res.end();
        });
    }
    else
    {
        res.send('Please Enter Email Address and Password Details');
        res.end();
    }

}
// try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     res.redirect('/login')
//   } catch {
//     res.redirect('/register')
//   }
module.exports= register