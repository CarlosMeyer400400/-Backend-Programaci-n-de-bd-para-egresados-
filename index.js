const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database:'estadiaegresados',
        user:'root',
        password:''
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexión exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.get('/usuarios', (req, res) => {
    const query = `SELECT * FROM usuarios;`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
    })
})

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuarios WHERE id_usuario=${id};`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
    })
})

app.post('/usuarios/agregar', (req, res) => {
    const usuario = {
        matricula: req.body.matricula,
        carrera: req.body.carrera,
        nombre: req.body.nombre,
        sexo: req.body.sexo,
        telefono_personal: req.body.telefono_personal, 
        telefono_recados: req.body.telefono_recados,  
        correo_institucional: req.body.correo_institucional,
        correo_personal: req.body.correo_personal,
        estatus_laboral: req.body.estatus_laboral,
        estudiando: req.body.estudiando, 

//NO TRABAJA 
       conoce_bolsa_trabajo: req.body.conoce_bolsa_trabajo,
       utiliza_bolsa_trabajo: req.body.utiliza_bolsa_trabajo,
       calidad_servicio: req.body.calidad_servicio,
       capacitacion_postegreso: req.body.capacitacion_postegreso,
       sugerencias: req.body.sugerencias,

//SI TRABAJA        

       medio_colocacion: req.body.medio_colocacion,
       localidad_empleo: req.body.localidad_empleo,
       domicilio_empresa: req.body.domicilio_empresa,
       tiempo_colocacion: req.body.tiempo_colocacion,
       tipo_organizacion: req.body.tipo_organizacion,
       tamano_organizacion: req.body.tamaño_organizacion,
       nombre_empresa: req.body.nombre_empresa,
       giro_empresa: req.body.giro_empresa,
       sueldo_mensual: req.body.sueldo_mensual,
       tiene_prestaciones: req.body.tiene_prestaciones,
       ocupacion: req.body.ocupacion,
       puesto_actual: req.body.puesto_actual,
       trabaja_perfil_egreso: req.body.trabaja_perfil_egreso,
       nombre_jefe: req.body.nombre_jefe,
       telefono_jefe: req.body.telefono_jefe,
       numero_trabajos: req.body.numero_trabajos,
       puestos_directivos: req.body.puestos_directivos,
       empresa_propia: req.body.empresa_propia,
       experiencia_transnacional: req.body.experiencia_transnacional,
       solucion_problemas: req.body.solucion_problemas,
       desempeno_funciones: req.body.desempeño_funciones,
       comunicacion_ideas: req.body.comunicacion_ideas,
       capacidad_liderazgo: req.body.capacidad_liderazgo,
       habilidades_faltantes: req.body.habilidades_faltantes,
    };

    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuario, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se Respondio Correctamente el Formulario`)
    })
})

app.put('/usuarios/actualizar/:id', (req, res) => {
    const { id } = req.params
    const { nombre, email } = req.body

    const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE id_usuario='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se actualizó correctamente el usuario`)
    })
})

app.delete('/usuarios/borrar/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM usuarios WHERE id_usuario=${id};`
    conexion.query(query, (error) => {
        if(error) console.error(error.message)

        res.json(`Se eliminó correctamente el usuario`)
    })
})
