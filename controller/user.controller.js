'use strict'

import User from '../models/user.model'
import config from '../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {

    static async all(req, res) {
        try {
            let users = await User.find().select(['-__v', '-password'])
            return res.status(200).json({
                users: users
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }


    static async one(req, res) {
        try {
            let user = await User.findById(req.params.id).select(['-__v', '-password'])
            if (user === null) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            return res.status(200).json({
                user: user
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }

    static async edit(req, res) {
        try {
            let user = await User.findById(req.params.id).populate('websites').select(['-__v', '-password'])
            if (user === null) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            user.email = req.body.email.trim()
            user.password = req.body.password.trim()
            user.name = req.body.name.trim()
            user.lastName = req.body.lastName.trim()
            user.role = req.body.role.trim()

            user.save()

            return res.status(200).json({
                user: user
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    static async create(req, res) {

        try {

            req.body.email    = req.body.email.trim()
            req.body.password = await bcrypt.hash(req.body.password.trim(), 10)
            req.body.name     = req.body.name.trim()
            req.body.lastName = req.body.lastName.trim()
            req.body.role     = req.body.role.trim()

            let user = await User.create(req.body);
            return res.status(200).json({
                user: user
            });
        } catch (error) {
            return res.status(500).json({
                'message': error.message
            });
        }

    }

    static async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id).select(['-__v', '-password'])

            return res.status(200).json({
                message: 'success'
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    static async login(req, res) {

        req.body.email = req.body.email.trim().toLowerCase()
        req.body.password = req.body.password.trim()

        let user = await User.where({email: req.body.email}).findOne().select(['-__v'])

        if (user === null) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        try{
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({sub: user._id, role: user.role}, config.jwt_token,);
                let [password, ...userWithoutPassword] = user.toObject();
                userWithoutPassword.token = token;

                return res.status(200).json({
                    token: token
                })
            }
        }catch (err){
            return res.status(500).json({
                message: err.message
            })
        }
    }

    static async logout(req, res) {
    }
}

export default UserController;
