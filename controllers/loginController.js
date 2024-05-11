const fspromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt")

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
        res.json({"message": `${name} is logged in, enjoy`})
    } else{
        res.sendStatus(401)
    }
}

module.exports = handleLogin