module.exports = {
  getSingleCar: (req, res) => {
    const id = req.params.id;

    let query =
      "SELECT c.id AS id, c.name AS Model, f.name AS Constructeur, e.name AS Energie, c.years AS Annee, c.price AS Prix, c.image AS Photo \
    FROM cars AS c \
    JOIN factories AS f ON c.factoryId = f.id \
    JOIN energies AS e ON c.energyId = e.id \
    WHERE c.id= " +
      id;

    db.query(query, (err, result) => {
      console.log(result);
      if (err) {
        res.send(err);
      }
      res.render("show", { cars: result[0] });
    });
  },
};
