const User = require("../models/User");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");
require("dotenv").config();
//const bcrypt = require("bcryptjs");


//revisar 03.07.00 menor//03.11.06 listo
const registerForm = (req, res) => {
  res.render("register");
};

const loginForm = (req, res) => {
    res.render("login");
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //return res.json(errors);
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/register");
  }

  const { userName, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) throw new Error("Ya existe ese usuario");

    //user = new User (req.body);
    user = new User({
      userName,
      email,
      password,
      tokenConfirm: nanoid(),
      rol: "administrado",
    });
    await user.save();

    //enviar correo electronico


    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSEMAIL,
      },
    });



    await transport.sendMail({
      from: "<veriica@gmial.com>", //'"Fred Foo 👻" <foo@example.com>', // sender address
      to: user.email, // list of receivers
      subject: "Verifica tu cuenta de correo", // Subject line
      text: "Hello world?", // plain text body
      html: `
      <h1>Gracias por Registrate</h1>
      <p>Bienvenido al sistema automatizado de url y notas</p>
      <br> 
      <p>Estas proximo a vivir una gran aventura <b>URL NICE<b></p>
      <a href=${process.env.PATHHEROKU || "http://localhost:5000"}/auth/confirmar/${user.tokenConfirm}">Verifica tu cuenta aqui</a>`
    });



    req.flash("mensajes", [{ msg: "Revisa tu correo y valida tu cuenta " }]);
    res.redirect("/auth/login");

    //const salt = await bcrypt.genSalt(10);
    //console.log(await bcrypt.hash(user.password, salt));

    //console.log(user);
    //res.json(user);
  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/auth/register");
    //return res.json({error: error.message});
    //console.log(error)
  }
  //res.json(req.body);
};

const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ tokenConfirm: token });
    if (!user) throw new Error("No existe ese usuario");
    user.cuentaConfirmada = true;
    user.tokenConfirm = null;

    await user.save();
    //res.json(user);
    req.flash("mensajes", [
      { msg: "Cuenta verificada, puedes iniciar session" },
    ]);

    res.redirect("/auth/login");
  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    res.redirect("/auth/login");
    // res.json({error: error.message});
  }
};



const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/login");
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No existe este email");
    if (!user.cuentaConfirmada)
    
    
    
    /*
    {
    
    
    
    
    
    
    
    
    
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.userEmail,
        pass: process.env.passEmail,
      },
    });



    await transport.sendMail({
      from: "<veriica@gmial.com>", //'"Fred Foo 👻" <foo@example.com>', // sender address
      to: user.email, // list of receivers
      subject: "Verifica tu cuenta de correo", // Subject line
      text: "Hello world?", // plain text body
      html: `
      <h1>Gracias por Registrate</h1>
      <p>Bienvenido al sistema automatizado de url y notas</p>
      <br> 
      <p>Estas proximo a vivir una gran aventura <b>URL NICE<b></p>
      <a href="http://localhost:5000/auth/confirmar/${user.tokenConfirm}">Verifica tu cuenta aqui</a>`, // html body
    });
    
    
    
    
    
    
  }
    */
    
    throw new Error("Falta confirmar cuenta");






    if (!(await user.comparePassword(password)))
      throw new Error("Contrasena No Correcta");

    //me esta creando la session de udsaurio a traves de passport
    req.login(user, function (err) {
      if (err) throw new Error("Error al crear la session");
      return res.redirect("/");
    });
  } catch (error) {
    //console.log(error);
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/auth/login");
    //res.send(error.message)
  }
};

const cerrarSesion = (req, res) => {
  req.logout();
  return res.redirect("/auth/login");
};

module.exports = {
  loginForm,
  registerForm,
  registerUser,
  confirmarCuenta,
  loginUser,
  cerrarSesion,
};
