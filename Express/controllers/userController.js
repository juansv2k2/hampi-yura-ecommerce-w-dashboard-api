const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");

const Users = require("../services/userService");

const controller = {
  //Registro de usuario
  register: (req, res) => {
    return res.render("userRegisterForm");
  },
  processRegister: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("userRegisterForm", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    // Check if user already exists using userService
    let userInDB = Users.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("userRegisterForm", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    try {
      // Create user using userService instead of Sequelize
      const createdUser = Users.create(req.body, req.file);
      return res.redirect("/user/login");
    } catch (error) {
      console.error("Registration error:", error);
      return res.render("userRegisterForm", {
        errors: {
          email: {
            msg: "Error al crear el usuario. Intenta de nuevo.",
          },
        },
        oldData: req.body,
      });
    }
  },

  //Login de usuarios
  login: (req, res) => {
    return res.render("userLoginForm");
  },
  loginProcess: async (req, res) => {
    try {
      // Use the JSON-based userService instead of Sequelize
      let userToLogin = await Users.findByField("email", req.body.email);
      console.log("User found:", userToLogin);

      //Si hay coincidencia con el email:
      if (userToLogin) {
        let isOkThePassword = bcryptjs.compareSync(
          req.body.password,
          userToLogin.password
        );

        //Verificamos que también esté ok la password:
        if (isOkThePassword) {
          // Create a copy without password for session
          let userForSession = { ...userToLogin };
          delete userForSession.password;
          req.session.userLogged = userForSession;

          // si en el request vino "remember_user", seteo una cookie en el response.
          // se va llamar "email", y lo que guarda es la propiedad email con la duración x.
          if (req.body.remember_user) {
            res.cookie("email", req.body.email, {
              maxAge: 1000 * 60 * 5,
            });
          }
          //Si todo está ok, redirecciona al perfil del usuario:
          return res.redirect("/user/userProfile");
        }
        // Si la clave está mal, envía error de credenciales inválidas
        return res.render("userLoginForm", {
          errors: {
            password: {
              msg: "Las credenciales son inválidas",
            },
          },
        });
      }
      //Si el mail está mal, envía este error:
      return res.render("userLoginForm", {
        errors: {
          email: {
            msg: "No se encuentra este email en nuestra base de datos",
          },
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.render("userLoginForm", {
        errors: {
          email: {
            msg: "Error en el sistema. Intenta de nuevo.",
          },
        },
      });
    }
  },

  profile: (req, res) => {
    return res.render("userProfile", {
      user: req.session.userLogged,
    });
  },

  edit: (req, res) => {
    const user = Users.findByPk(req.params.id);
    res.render("editUserProfile", { user });
  },
  // Update - Method to update
  update: (req, res) => {
    try {
      // Update user using userService
      const updateData = {
        fullName: req.body.fullName,
        birthdate: req.body.birthdate,
        email: req.body.email,
      };

      // Add password if provided
      if (req.body.password && req.body.password.trim() !== "") {
        updateData.password = req.body.password;
      }

      Users.editOne(req.session.userLogged.id, updateData, req.file);

      // Update session data
      const updatedUser = Users.findByPk(req.session.userLogged.id);
      if (updatedUser) {
        delete updatedUser.password;
        req.session.userLogged = updatedUser;
      }

      res.redirect("/user/userProfile");
    } catch (error) {
      console.error("Update error:", error);
      res.redirect("/user/userProfile");
    }
  },

  /* CARRITO
    cart: async (req, res) => {
        let prod = await db.Cart.findAll({
            where: { user_id: req.session.userLogged.id },
            include: [{ association: "product", include: "type" }],
            group: "product_id",
        });
        let totalPrice = 0;
        prod.map((producto) => {
            totalPrice = totalPrice + Number(producto.sub_total);
        });
        res.render("users/cart", { productos: prod, totalPrice: totalPrice });
    },
    addCart: async (req, res) => {
        if (res.locals.isLogged == true) {
            console.log("por crear");
            let exsist = await db.Cart.findOne({
                where: {
                    user_id: Number(req.session.userLogged.id),
                    product_id: Number(req.params.id),
                },
                include: [{ association: "product", include: "type" }],
            });
            let producto = await db.Product.findOne({
                where: {
                    id: Number(req.params.id),
                },
            });
            console.log(exsist);
            if (exsist) {
                await db.Cart.update(
                    {
                        quantity: exsist.quantity + 1,
                        sub_total:
                            Number(exsist.sub_total) + Number(producto.price),
                    },
                    {
                        where: {
                            user_id: Number(req.session.userLogged.id),
                            product_id: Number(req.params.id),
                        },
                    }
                );
                res.redirect("/");
            } else {
                await db.Cart.create({
                    user_id: Number(req.session.userLogged.id),
                    product_id: Number(req.params.id),
                    quantity: 1,
                    sub_total: producto.price,
                });
                res.redirect("/");
            }
        } else {
            res.redirect("/user/login");
        }
    },
    */

  // si cierro session/me deslogueo, la cookie debe destruirse, ya que si cierro el navegador me sigue logueando
  logout: (req, res) => {
    res.clearCookie("email");
    req.session.destroy();
    console.log("deslogueado");
    return res.redirect("/");
  },
};

module.exports = controller;
