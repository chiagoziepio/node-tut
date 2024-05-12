const fspromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


const users = {
    user: require("../data/userrs.json"),
    setUser: function(info){this.user = info}
}

const handleLogin = async (req,res)=>{
    const {name, pwd} = req.body;
    if(!name, !pwd)return res.status(400).json({"message": "name and password required"});
    const theUser = users.user.find(person => person.username = name)
    if(!theUser) return res.sendStatus(401)
    const checkPwd = await bcrypt.compare(pwd, theUser.password);
    if(checkPwd){
        const accesstoken = jsonwebtoken.sign(
            {"username":theUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "40s"}
        );
        const refreshtoken = jsonwebtoken.sign(
            {"username":theUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
        const otherUsers = users.user.filter(person => person.username !== theUser.username);
        const currentUser = {...theUser, refreshtoken};
        users.setUser([...otherUsers, currentUser]);
        fspromises.writeFile(
            path.join(__dirname, "..", "data", "userrs"),
            JSON.stringify(users.user)
        )
        res.cookie("jwts" , refreshtoken, { httpOnly: true, maxAge: 24 * 60 *60 * 1000})
        res.json({ accesstoken})
    } else{
        res.sendStatus(401)
    }
}

module.exports = handleLogin