exports.checkHealth = (req, res) => {
    res.status(200).json({ status: 'UP' });
};
  