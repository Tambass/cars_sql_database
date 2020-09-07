module.exports = {
  getEditPage: (req, res) => {
    const id = req.params.id;

    let query = [
      "SELECT \
            c.id AS id, \
            c.name AS Model, \
            f.name AS Constructeur, \
            e.name AS Energie, \
            c.years AS Annee, \
            c.price AS Prix, \
            c.image AS Photo \
        FROM \
            cars AS c \
        JOIN \
            factories AS f ON c.factoryId = f.id \
        JOIN \
            energies AS e ON c.energyId = e.id \
        WHERE \
            c.id= " +
        id,

      "SELECT id, name FROM factories",

      "SELECT id, name FROM energies",
    ];

    db.query(query.join(";"), (err, result) => {
      console.log(result);
      if (err) {
        res.send(err);
      }
      res.render("edit", {
        car: result[0][0],
        factories: result[1],
        energies: result[2],
      });
    });
  },

  putEditPage: (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const factory = req.body.factory;
    const year = req.body.year;
    const price = req.body.price;
    const energy = req.body.energy;
    const image = req.body.image;

    let query =
      "UPDATE cars SET name = '" +
      name +
      "', factoryId = '" +
      factory +
      "', years = '" +
      year +
      "', price = '" +
      price +
      "', energyId = '" +
      energy +
      "', image = '" +
      image +
      "' WHERE id = '" +
      id +
      "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.send(err);
      }
      //res.json(result[0]);
      res.redirect("/");
    });
  },
};
