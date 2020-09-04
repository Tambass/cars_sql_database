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

      "SELECT name FROM factories",

      "SELECT name FROM energies",
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

  putEditPage: (req, res) => {},
};
