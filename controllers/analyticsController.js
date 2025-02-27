const Analytics = require('../models/Analytics');

exports.getLinkAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({ 
      user: req.user.id,
      link: req.params.linkId 
    });

    res.json(analytics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getOverallAnalytics = async (req, res) => {
  try {
    const totalClicks = await Analytics.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      { $group: { 
        _id: null, 
        totalClicks: { $sum: '$clicks' },
        uniqueVisitors: { $sum: '$uniqueVisitors' }
      }}
    ]);

    const topLinks = await Analytics.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { clicks: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalClicks: totalClicks[0]?.totalClicks || 0,
      uniqueVisitors: totalClicks[0]?.uniqueVisitors || 0,
      topLinks
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};