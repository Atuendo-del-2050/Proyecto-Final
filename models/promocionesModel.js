
var pool = require('./bd');

async function getPromociones() {
    var query = "select * from promociones order by id desc";
    var rows = await pool.query(query);
    return rows;
}

async function insertPromocion(obj) {
    try {
        var query = "insert into promociones set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    }  catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletePromocionById(id) {
    var query = "delete from promociones where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getPromociones(id) {
    var query = "select * from novedades where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}


// para editar update de los datos
async function editarPromocionById(obj, id) {
    try {
        var query = 'update novedades set ? where id= ? ';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getPromociones, insertPromocion, deletePromocionById, getPromocionesById, editarPromocionById }
