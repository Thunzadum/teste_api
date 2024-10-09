module.exports = {
    ping: async(req, res) => {
        res.json({pong: true});
    }
}