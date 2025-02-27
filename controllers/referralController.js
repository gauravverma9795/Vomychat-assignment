const Referral = require('../models/Referral');
const User = require('../models/User');

exports.getUserReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user.id })
      .populate('referred', 'username email');
    
    res.json(referrals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getReferralStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const totalReferrals = await Referral.countDocuments({ 
      referrer: req.user.id 
    });
    
    const completedReferrals = await Referral.countDocuments({ 
      referrer: req.user.id,
      status: 'COMPLETED'
    });

    res.json({
      totalReferrals,
      completedReferrals,
      referralCode: user.referralCode,
      referralCount: user.referralCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};