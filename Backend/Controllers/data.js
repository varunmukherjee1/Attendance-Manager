const Class = require('../Models/class')

const sendClasses = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
        return res.redirect('login')
    }
    const classes = await Class.find()
    // console.log(classes);c
    res.send(classes);
}

module.exports = {
    sendClasses
}