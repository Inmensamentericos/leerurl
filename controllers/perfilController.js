const formidable = require("formidable");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const { dir } = require("console");

module.exports.formPerfil = async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        res.render("perfil", {user: req.user, imagen: user.imagen});
    } catch (error) {
        req.flash("mensajes", [{ msg: "Error al leer el usuario" }]);
        return res.redirect("/perfil");
    }
};


module.exports.editarFotoPerfil = async (req, res)=>{
    
    const form = new formidable.IncomingForm();

    //form.maxFileSize = 50*1024*1024;  //5 mb

    form.parse(req, async(err, fields, files)=>{
        try {
            if (err) {
                throw new Error ("Fallo la subida de imagen");
            }
            console.log(fields);
            //console.log(files );
            const file = files.myFile;

            if(file.originalFilename === ""){
            throw new Error("Por Favor, agrega una imagen"); ///38.01
            }

            const imageTypes = ["image/jpeg", "image/png"];

            if (!imageTypes.includes(file.mimetype)){
                throw new Error("Por favor agrega una imagen  .png o .jpg");
            }

            if (file.size > 50 * 1024 * 1024){
                throw new Error("Menos de 5MB por favor")
            }
           
            const extension = file.mimetype.split("/")[1];
            const dirFile = path.join(
              __dirname,
              `../public/img/perfiles/${req.user.id}.${extension}`
            );
            
            fs.renameSync(file.filepath, dirFile);


            const user = await User.findById(req.user.id);
            user.imagen = `${req.user.id}.${extension}`;
            await user.save();

            const image = await Jimp.read(dirFile);
            image.resize(200,200).quality(90).writeAsync(dirFile);
         
            req.flash("mensajes", [{ msg: "Ya se subio la imagen"}]);            
        } catch (error) {
            req.flash("mensajes", [{ msg: error.message}]);   
        }
        finally{
            return res.redirect("/perfil");      
        }
    });

    //return req.json({ ok: true});
}; 






/*
/*
                                    if (
                                        !(
                                            file.mimetype === "image/jpeg" ||
                                            file.mimetype === "image/png"
                                            
                                        )
                                    ){
                                        throw new Error("Por favor agrega una uimagen  .png o .jpg")
                                

*/