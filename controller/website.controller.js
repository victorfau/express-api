'use strict'

import User from '../models/user.model'
import Website from '../models/website.model'

export default class WebsiteController {
    static async index(req, res){
        try {
            let websites = await Website.find().populate('pages').populate('author')
            return res.status(200).json(websites)
        }catch (err) {return res.status(500).json(err.message)}
    }

    static async one(req, res){
        try {
            let website = await Website.findById(req.params.id)
            if (website === null) return res.status(404)
            else return res.status(200).json(website)
        }catch (e) {return res.status(500).json(e.message)}
    }

    static async create(req, res){
        try{
            let website = new Website(req.body)
            let author = await User.findOne({_id: req.user.sub})

            website.date_in = Date.now()
            website.last_payment = Date.now()
            website.author = author

            author.websites.push(website)

            await website.save()
            await author.save()

            return res.status(200).json(website)
        }catch (e) {return res.status(500).json(e.message)}
    }
}