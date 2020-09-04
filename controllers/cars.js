module.exports = {
  getCars: (req, res) => {
    let query =
      "SELECT c.id AS id, c.name AS Model, f.name AS Constructeur, c.years AS Annee, c.price AS Prix, c.image AS Photo \
                FROM cars AS c JOIN factories AS f ON c.factoryId = f.id;";
    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.render("index", { cars: result });
    });
  },
};
