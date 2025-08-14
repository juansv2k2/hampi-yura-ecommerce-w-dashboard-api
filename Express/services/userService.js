// 1. Guardar al usuario
// 2. Buscar al user que se quiera loguear por su email
// 3. Buscar aun user por su id
// 4. Editar info user
// 5. Eliminar user de db

// CRUD

//--> Creo un obj lit con los métodos

const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

const userService = {
  //--> hacemos referencia al nombre del archivo que queremos utilizar.
  fileName: path.join(__dirname, "../database/users.json"),

  //--> traemos los users, leemos el archivo .json en formato de array (method parse)
  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  //-->  toma a todos los usuarios, y como me interesa obtener el ultimo "id" utilizo "pop()"
  generateId: function () {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  //--> method para obtener todos los users (parecido a getData, mismo resultado)
  findAll: function () {
    return this.getData();
  },

  //--> buscamo un user por su ID, fc que recibe un id.
  //--> 1ro obtengo todos los usuarios, y dsp encuentro el relacionado con el id que me pasan
  //--> method find donde itera el array y me retorna el user que matcheo con el id que me pasaron
  findByPk: function (id) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((oneUser) => oneUser.id === id);
    return userFound;
  },

  //--> me permite buscar por un determinado nombre de campo, el primero que encuentra, matchea.
  //--> luego en controllers, busca por el campo "email", req.body.email.
  findByField: function (field, text) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((oneUser) => oneUser[field] === text);
    return userFound;
  },

  //--> creamos un user, y guardamos esa info en nuestro .json con push
  //--> sobreescribimos el json tansformandolo en string
  create: function (payload, avatar) {
    let allUsers = this.findAll();
    let newUser = {
      ...payload,
      id: this.generateId(),
      admin: 0,
      password: bcryptjs.hashSync(payload.password, 10),
      avatar: avatar ? avatar.filename : "default-avatar.png",
    };
    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
    return newUser;
  },

  //--> editar un usuario
  editOne: function (id, payload, avatar) {
    let allUsers = this.getData();
    let userIndex = allUsers.findIndex((user) => user.id == id);

    if (userIndex !== -1) {
      let userToEdit = allUsers[userIndex];

      // Update fields
      userToEdit.fullName = payload.fullName || userToEdit.fullName;
      userToEdit.birthdate = payload.birthdate || userToEdit.birthdate;
      userToEdit.email = payload.email || userToEdit.email;

      // Update password only if provided
      if (payload.password && payload.password.trim() !== "") {
        userToEdit.password = bcryptjs.hashSync(payload.password, 10);
      }

      // Update avatar if provided
      if (avatar) {
        userToEdit.avatar = avatar.filename;
      }

      // Update admin status if provided
      if (payload.admin !== undefined) {
        userToEdit.admin = payload.admin ? 1 : 0;
      }

      // Save back to file
      fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
      return userToEdit;
    }
    return null;
  },

  //--> traigo todos los usuarios, recorro los users con filter
  //--> y me devuelve los users cuyo id es distinto al que se paso por parametro
  delete: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
    return true;
  },
};

module.exports = userService;
