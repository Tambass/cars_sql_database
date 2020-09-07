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
  getAddCar: (req, res) => {
    let query = [
      "SELECT id, name FROM factories",
      "SELECT id, name FROM energies",
    ];
    db.query(query.join(";"), (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.render("add", { factories: result[0], energies: result[1] });
    });
  },
  addCar: (req, res) => {
    const name = req.body.name;
    const factoryId = req.body.factory;
    const year = req.body.year;
    const price = req.body.price;
    const energyId = req.body.energy;
    const image = req.body.image;

    let query =
      "INSERT INTO cars (name, factoryId, years, price, energyId, image) \
    VALUES \
    ('" +
      name +
      "', '" +
      factoryId +
      "', '" +
      year +
      "', '" +
      price +
      "', '" +
      energyId +
      "', '" +
      image +
      "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.redirect("/");
    });
  },
};
