const fspromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt")

const users = {
    user: require("../data/userrs.json"),
    setUser: function(info){this.user = info}
}

const handleNewusers = async(req, res)=>{

    const {name , pwd} = req.body
    if(!name || !pwd) return res.status(400).json({"message": "name and password are needed"});
    const alreadyExisted = users.user.find(person => person.username === name);
    if(alreadyExisted) return res.sendStatus(409)

    try {
        const hashedPwd = await bcrypt.hash(pwd , 10)
        const newUser = {
            "username": name,
            "password": hashedPwd
        }
        users.setUser([...users.user, newUser]);

        await fspromises.writeFile(
            path.join(__dirname, "..", "data", "userrs.json"),
            JSON.stringify(users.user)
        )
        console.log(users.user);
        res.status(201).json({"message": `a new user ${name} created`})
        
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
}

module.exports = handleNewusers