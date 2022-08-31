module.exports = (temp) => (req, res, next) => {
  Promise.resolve(temp(req, res, next).catch(next));
};
