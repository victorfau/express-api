'use strict'

import Page from '../models/page.model'
import Bloc from '../models/bloc.model'
import Website from '../models/website.model'

class PageController {

    static async all(req, res) {
        try {
            let pages = await Page.find().populate('blocs')
            return res.status(200).json(pages)

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    static async one(req, res) {
        try {
            let page = await Page.findById(req.params.id).populate('blocs')
            if (page === null) {
                return res.status(404).json({
                    message: 'Page not found'
                })
            }
            return res.status(200).json(page)

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }

    static async edit(req, res) {
        try {
            let page = await Page.findById(req.params.id)
            if (page === null) {
                return res.status(404).json({
                    message: 'Page not found'
                })
            }
            page.save()

            return res.status(200).json(page)

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    static async create(req, res) {

        try {
            let website = await Website.findOne({_id: req.body.website})
            let page = await Page.create(req.body);

            website.pages.push(page)

            await website.save()

            return res.status(200).json(page);
        } catch (error) {
            return res.status(500).json({
                'message': error.message
            });
        }

    }

    static async delete(req, res) {
        try {
            let page = await Page.findById(req.params.id)
            page.blocs.map(async (bloc_id) => {
               await Bloc.findByIdAndDelete(bloc_id)
            })
            await page.delete()
            return res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    static async addBloc(req, res) {
        try {
            let page = await Page.findById(req.params.id).populate('blocs')
            if (page === null) {
                return res.status(404).json({
                    message: 'Page not found'
                })
            }
            let bloc = await Bloc.create(req.body);
            page.blocs.push(bloc)
            page.save()
            return res.status(200).json({page})
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    static async removeBloc(req, res) {
        await Bloc.findByIdAndRemove(req.params.id)
        return res.status(200).json();
    }
}

export default PageController;
