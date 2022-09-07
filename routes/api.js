var express = require('express');
var router = express.Router();
var promocionesModel = require('./../models/promocionesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');


router.get('/promociones', async function (req, res, next) {
    let promociones = await promocionesModel.getPromociones();

    promociones = promociones.map(novedad => {
        if (novedad.img_id) {
            const imagen = cloudinary.image(promocion.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...promocion,
                imagen
            }
        } else {
            return {
                ...promocion,
                imagen: ''
            }
        }
    });

    res.json(promociones);
});


router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'gabypna@yahoo.com.ar',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacto a traves de la web y quiere mas informacion a este correo:
        ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_USER,
        port: process.env.SMTP_PASS,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });
    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
});

module.exports = router;