const user = require("../model/userModel")
const jwt = require("jsonwebtoken")
const secret_key = "fyujhjjhgjdsgfjs"


module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(400).json({ massage: "token not found" })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(400).json({ message: "invaled token" })
        }

        const decode = jwt.verify(token, secret_key);
        if (!decode) {
            return res.status(400).json({ message: "email are not found" })
        }

        const existinguser = await user.findById(decode.id)
        if (!existinguser) {
            return res.status(400).json({ message: 'user not found' })
        }

        req.user = existinguser
        next()

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" })
        }
        res.status(500).json({ message: "internal server error", error })
    }
}