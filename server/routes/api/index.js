const User = require('../../models/user');

const router = require('express').Router();

router.get('/:username', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { username } = req.params;

    User.find({ username: username }, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
