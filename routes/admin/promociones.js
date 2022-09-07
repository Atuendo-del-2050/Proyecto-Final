var express = require('express');
var router = express.Router();
var promocionesModel = require('./../../models/promocionesModel');
var util = require('util');
const { runInNewContext } = require('vm');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader, destroy);


/* GET home page. */
router.get('/', async function (req, res, next) {
  var promociones = await promocionesModel.getPromociones();

  promociones = promociones.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(promocion.img_id, {
        width: 100,
        height: 100,
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

  res.render('admin/promociones', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    promociones
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (resq, res, next) => {
  try {
    var img_id = '';
    //console.log(req.files.imagen);

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.subtitulo != "" &&
      req.body.cuerpo != "") {
      await promocionesModel.insertPromocion({
        ...req.body, // spread > tituilo,subt.,cuerpo
        img_id
      });
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargo la promocion'
    });
  }
});

//para eliminar una promocion/
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  let promocion = await promocionesModel.getPromocionesById(id);
  if (promocion.img_id) {
    await (destroy(promocion.img_id));
  }

  await promocionesModel.deletePromocionById(id);
  res.redirect('/admin/promociones');
});

// para listar una sola promocion by id - editar

router.get('/editar/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  var promocion = await promocionesModel.getPromocionesById(id);

  console.log(req.params.id);
  res.render('admin/editar', {
    layout: 'admin/layout',
    promocion
  })
});

//para editar la promocion
router.post('/editar', async (resq, res, next) => {
  try {

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).lenght > 0) {
        imagen = req.files.imagen;
        img_id = (await
          uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo, img_id
    }

    await promocionesModel.editarPromocionById(obj, req.body.id);
    res.redirect('/admin/promociones');


  } catch (error) {
    console.log(error)
    res.render('admin/editar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la promocion'
    });
  }
});

module.exports = router;