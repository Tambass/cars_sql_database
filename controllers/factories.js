module.exports = {
  getFactories: (req, res) => {
    let query = "SELECT * FROM factories";
    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.render("factories", { factories: result });
    });
  },
  getFactory: (req, res) => {
    const id = req.params.id;

    let query =
      "SELECT id, name FROM factories WHERE id = " +
      id;

    db.query(query, (err, result) => {
      console.log(result);
      if (err) {
        res.send(err);
      }
      res.render("edit_factory", { factories: result[0] });
    });
  },
  putFactory: (req, res) => {},
  deleteFactory: (req, res) => {},
};
