const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const md5 =require("md5")

const userRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const checkUserQuery = "SELECT * FROM user_registration_table WHERE username = ? OR email = ?";
        con.query(checkUserQuery, [username, email], (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).send("Server side error");
            }

            if (result && result.length > 0) {
                return res.status(400).send({ok:false,message:"User already exists"});
            }

            // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            const hashedPassword=md5(password)
            const id = uuidv4();
            const addUserQuery = "INSERT INTO user_registration_table (id, username, email, password) VALUES (?, ?, ?, ?)";
            con.query(addUserQuery, [id, username, email, hashedPassword], (err) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).send("Error registering user");
                }
                res.status(200).send({ok:true,message:"User successfully registered"});
            });
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
    }
};

module.exports = { userRegistration };
