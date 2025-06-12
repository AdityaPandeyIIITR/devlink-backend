const Link = require("../models/Link");
const shortid = require("shortid");

const createShortLink = async(req,res) =>{
    const {originalUrl} = req.body;
    const userId = req.user;
    
    if (!originalUrl) return res.status(400).json({message : "Original URL required"});

    try {
        const shortId = shortid.generate();

        const newLink = new Link({
            originalUrl,
            shortId,
            createdBy : userId,
        });

        await newLink.save();

        res.status(201).json({
            message: "Short URL created",
            shortUrl: `http://localhost:5000/${shortId}`,
            shortId,
            originalUrl
        });

    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

module.exports = { createShortLink };