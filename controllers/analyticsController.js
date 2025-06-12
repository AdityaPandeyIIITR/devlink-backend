const Click = require("../models/Click");
const Link = require("../models/Link");

//GET /api/analytics/:shortId
const getClickAnalytics = async(req,res) =>{
    const { shortId } = req.params;

    try {
        //Find the link
        const link = await Link.findOne({ shortId });
        if (!link){
            return res.status(400).json({message: "Link not found"});
        }

        // 2. Check if the logged-in user is the owner
        if (link.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied: Not the owner of this link" });
        }

        const clicks = await Click.find({ linkId: link._id}).sort({ timestamp : -1 });
        res.json({
            totalClicks: clicks.length,
            clicks: clicks.map(click => ({
            timestamp: click.timestamp,
            ip: click.ip,
            referrer: click.referrer,
            userAgent: click.userAgent,
        })),
    });

    } catch (error) {
        console.error("Error in getClickAnalytics:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getClickAnalytics };