const { URL } = require("url");

const validarURL = (req, res, next) => {
    try {
        const { origin } = req.body;
        const urlFrontend = new URL(origin);
        if (urlFrontend.origin !== "null") {
            if (
                urlFrontend.protocol === "http:" ||
                urlFrontend.protocol === "https:"
            ) {
                return next();
            }
            throw new Error("Tiene que tener Https://");
            
        }
        throw new Error("no valia 😋"); 
        
    } catch (error) {

        if (error.message === "invalid URL") {
            req.flash("mensajes", [{ msg: "url no valida" }]);
        }
        else{
            req.flash("mensajes", [{ msg: error.message }]);
        }
        return res.redirect("/");

        // console.log(error);
       // return res.send("Url no valida")
        //req.flash("mensajes", [{ msg: error.message }]);
    }
};

module.exports = validarURL;

/*  como estaba al 28/03/2022 que funcionaba pero no era igual al video
const { URL } = require("url");

const validarURL = (req, res, next) => {
    try {
        const { origin } = req.body;
        const urlFrontend = new URL(origin);
        if (urlFrontend.origin !== "null") {
            return next();
        }
        else {
            throw new Error("no valida 😲")
        }
    } catch (error) {
        // console.log(error);
        return res.send("Url no valida")
    }
};

module.exports = validarURL;

*/