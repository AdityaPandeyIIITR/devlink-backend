const Click = require("../models/Click");
const Link = require("../models/Link");

const handleRedirect = async(req,res) => {
    const {shortId} = req.params;

    try {
        const link = await Link.findOne({shortId});
        if (!link){
            res.status(404).json({message : "Link not found"});
        }

        //save click details
        await Click.create({
            linkId : link._id,
            referrer : req.get("Referrer") || "Direct",
            userAgent: req.get("User-Agent"),
            ip: req.ip,
        });
        return res.redirect(link.originalUrl);
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { handleRedirect };
