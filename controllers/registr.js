module.exports = (req, res) => {
  res.render("registr", {
    errors: req.flash("registrationError"),
    data: req.flash("data")[0]
  })
}
