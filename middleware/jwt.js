import config from '../config'
import jwt from 'jsonwebtoken'

export function isAuth(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, config.jwt_token, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}

export function isAdmin(req, res, next){
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, config.jwt_token, (err, user) => {
        if (err) return res.sendStatus(403)
        console.log(user.role)
        if (user.role !== 'admin' && user.role !== 'dev') return res.sendStatus(403)
        req.user = user
        next()
    })
}

export function isDev(req, res, next){
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, config.jwt_token, (err, user) => {
        if (err) return res.sendStatus(403)
        if (user.role !== 'dev') return res.sendStatus(403)
        req.user = user
        next()
    })
}