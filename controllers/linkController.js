const Link = require('../models/Link');

exports.createLink = async (req, res) => {
  const { title, url, description, icon, order } = req.body;

  try {
    const newLink = new Link({
      user: req.user.id,
      title,
      url,
      description,
      icon,
      order
    });

    const link = await newLink.save();
    res.json(link);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserLinks = async (req, res) => {
  try {
    const links = await Link.find({ 
      user: req.user.id, 
      isActive: true 
    }).sort({ order: 1 });

    res.json(links);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateLink = async (req, res) => {
  const { title, url, description, icon, order, isActive } = req.body;

  try {
    let link = await Link.findById(req.params.linkId);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Ensure user owns the link
    if (link.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update fields
    if (title) link.title = title;
    if (url) link.url = url;
    if (description) link.description = description;
    if (icon) link.icon = icon;
    if (order !== undefined) link.order = order;
    if (isActive !== undefined) link.isActive = isActive;

    link = await link.save();
    res.json(link);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.linkId);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Ensure user owns the link
    if (link.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await link.remove();
    res.json({ message: 'Link removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};