
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

const users = {
    user: require("../data/userrs.json"),
    setUser: function(info){this.user = info}
}

const handleRefreshtoken =  (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwts)return res.sendStatus(401);
    console.log(cookies.jwts);
    const refreshToken = cookies.jwts
    const theUser = users.user.find(person => person.refreshToken === refreshToken)
    if(!theUser) return res.sendStatus(403)
    
    jsonwebtoken.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || theUser.username !== decoded.username) return res.sendStatus(403)
            const accesstoken = jsonwebtoken.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "40s"}
            );
            res.json({ accesstoken})
        }
    )
    
}

module.exports = handleRefreshtoken