const showDashboard = (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "teacher" || req.cookies[COOKIE_NAME].userType == "admin") {
        res.redirect('/pageNotFound')
    } else {
        res.render('dashboardStudent', req.cookies[COOKIE_NAME])
    }
}

module.exports = {
    showDashboard
}