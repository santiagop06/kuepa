const signinFunction = (req, res, db, bcrypt) => {
  db.select("username", "hash")
    .from("login")
    .where("username", req.body.username)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("username", req.body.username)
          .then((usr) => {
            res.status(200).json(usr[0]);
          })
          .catch((err) => res.status(400).json("impossible to find user"));
      }
      res.status(400).json("wrong credentials");
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  signinFunction: signinFunction,
};
