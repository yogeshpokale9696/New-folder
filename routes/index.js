var express = require('express');
const app = express()
app.set('view-engine', 'ejs')
var router = express.Router();
var database = require('../server_js/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index', { title: 'Express', session : req.session });
});

// router.post('../views/login', function(req, res, next){

//     var name = req.user.name;

//     var password = req.body.password;

//     if(name && password)
//     {
//         query = `
//         SELECT * FROM user 
//         WHERE username = "${name}"
//         `;

//         database.query(query, function(error, data){

//             console.log(data[count].id)
//             if(data.length > 0)
//             {
//                 for(var count = 0; count < data.length; count++)
//                 {
//                     if(data[count].pass == password)
//                     {
//                         request.session.user_id = data[count].id;

//                         response.redirect("/");
//                     }
//                     else
//                     {
//                         response.send('Incorrect Password');
//                     }
//                 }
//             }
//             else
//             {
//                 response.send('Incorrect Email Address');
//             }
//             response.end();
//         });
//     }
//     else
//     {
//         response.send('Please Enter Email Address and Password Details');
//         response.end();
//     }

// });

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

router.get('login',function(req,res,next){
    res.render('../views/login.ejs')
})
router.post('/login', function(req, res, next){

    var name = req.user.name;

    var password = req.body.password;
query = `
        SELECT * FROM user 
        WHERE username = "${name}"
        `;

        database.query(query, function(error, data){

            console.log(data[count].id)
        })
    })

module.exports = router;