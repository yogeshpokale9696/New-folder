const conn = require('./config.js');

async function tran(req, res) {
    try {

    const from_id = req.session.user.id;
    const acc_id = req.body.to_id;
    var too_id = 0
    const amount = req.body.amount;
    const user_name = req.body.user_name;
    const is_B_tran = 0;



        let query1 = (`SELECT id FROM user WHERE acc_id="${acc_id}"`);
        conn.query(query1, async function (err, data) {
            // console.log(data[0].id);
           if(err) {
            console.log(err);
            res.redirect('/new-tranf')
           }
           else{

           
            too_id = data[0].id;
            // console.log(err.message);


            await conn.query(
                `INSERT INTO transaction (from_u_id, too_u_id, amount,is_B_tran) VALUES (?,?,?,?)`,
                [from_id, too_id, amount, is_B_tran],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        // req.flash('error', 'Transaction failed');
                        res.redirect('/new-tranf')
                    } else {
                        console.log(result.affectedRows);
                        // req.flash('success', 'Transaction successfully added');
                        res.redirect('/new-trans')
                    }

                }
            );
        }
        })
    } catch (err) {
        console.log(err);
        res.redirect('/new-tranf')
    }
}


// async function tran_B(req, res) {
//     const from_id = req.session.user.id;
//     const to_id = req.body.to_id;
//     const amount = req.body.amount;
//     const user_name = req.body.user_name;
//     const is_B_tran = 0;
//     await conn.query(
//         `INSERT INTO b_tran (tran_id,block_no, data, hash) VALUES (?,?,?,?)`,
//         [from_id, to_id, amount, is_B_tran],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(result);
//             }
//         });
//     await conn.query(
//         `INSERT INTO transaction (from_id, to_id, amount,is_B_tran) VALUES (?,?,?,?)`,
//         [from_id, to_id, amount, is_B_tran],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(result);
//             }

//         }
//     );
// }

module.exports = { tran };