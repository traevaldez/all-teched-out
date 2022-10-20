const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require ('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.statusCode(404).end();
});

module.exports = router;