import jwt from 'jsonwebtoken'

const tokenVerification = (req, res, next) => {

    const apiKey = process.env.JWT_SECRET_KEY
    console.log('req.headers.authorization - ', req.headers.authorization);

    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(req.headers.authorization.replace("Bearer ", ""), apiKey, (err, decoded) => {
        if (err) {
            next('invalid token')
        }
        next()
    })

}

export default tokenVerification
