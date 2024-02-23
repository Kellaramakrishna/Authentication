
const jwt = require("jsonwebtoken")
const md5 =require("md5")

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM user_registration_table WHERE username = ?';
    // const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    const md5Hash=md5(password)
    await con.query(sql, [username, md5Hash], (err, results) => {
        if (err) {
            console.error("Error calling stored Procedure:", err);
            res.status(500).send("Internal Server Error");
            return;
        }


        if (results.length > 0) {
            const storedHashedPassword = results[0].password;
            console.log(storedHashedPassword)
            console.log(md5Hash)
            if (md5Hash === storedHashedPassword) {
                const user=results[0]
                console.log(user)
                const payload={username:user.username}
                const jwtToken = jwt.sign(payload, "my_key");
                res.status(200).send({ok:true,jwtToken});
                console.log(jwtToken)
            } else {
                res.json({ ok: false, message: "Incorrect password" });
            }
        } else {
            res.json({ ok: false, message: "User not found" });
        }
    });
};



module.exports = { userLogin };
