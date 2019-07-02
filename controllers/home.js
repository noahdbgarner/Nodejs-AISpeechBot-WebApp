exports.homePage = (req, res, next) => {
    res.render('home', {
        homeCSS: true,
        title: 'Home',
        buttonText: 'Talk'
    });
}
