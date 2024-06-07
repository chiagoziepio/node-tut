const fspromises = require("fs").promises;
const { log } = require("console");
const path = require("path");


const users = {
    user: require("../data/userrs.json"),
    setUser: function(info){this.user = info}
}

const handleLogout= async (req,res)=>{
    const cookies = req.cookies
    console.log(cookies);
    if(!cookies?.jwts)return res.sendStatus(204);
    
    const refreshToken = cookies.jwts
    const theUser = users.user.find(person => person.refreshToken === refreshToken)
    if(!theUser) {
        res.clearCookie('jwts', {httpOnly: true,sameSite: "None", secure: true })
        res.sendStatus(204)
    
    }

    const otherUsers = users.user.filter(person => person.refreshToken !== theUser.refreshToken);
    const currentUser = {...theUser, refreshToken: ''};
    users.setUser([...otherUsers, currentUser])
    await fspromises.writeFile(
        path.join(__dirname, "..", "data","userrs.json"),
        JSON.stringify(users.user)
    )
    
    res.clearCookie('jwts', {httpOnly: true,sameSite: "None", secure: true})
    res.sendStatus(204)
}

module.exports = handleLogout