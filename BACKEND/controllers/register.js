const registerFunction = (req, res, db, bcrypt) => {
  console.log(req.body);

  const { username, password, name, role } = req.body;

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        username: username,
      })
      .into("login")
      .returning("username")
      .catch((err) => res.status(400).json("user register"))
      .then((loginuser) => {
        return trx("users")
          .returning("*")
          .insert({
            username: username,
            name: name,
            role: role,
          })
          .then((user) => {
            res.status(200).json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};
module.exports = {
  registerFunction: registerFunction,
};
