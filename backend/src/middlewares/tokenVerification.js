import jwt from 'jsonwebtoken'

const tokenVerification = (req, res, next) => {

    const apiKey = process.env.JWT_SECRET_KEY
    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(req.headers.authorization.replace("Bearer ", ""), apiKey, (err, decoded) => {
        if (err) {
            next({ message: err.message, statusCode: 401 })
        }
        next()
    })

}

export default tokenVerification
