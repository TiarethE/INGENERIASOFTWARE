const asyncHandler = require('express-async-handler');
const Tarea = require('../models/tareasModel')

//Obtener todas las tareas 
const getTareas = asyncHandler (async (req, res) => {
    const tareas = await Tarea.find({user: req.user.id})
    res.status(200).json(tareas);
})
//Crear tarea 
const createTareas = asyncHandler (async (req, res) => {
    if(!req.body.texto){
        res.status(400)
        throw new Error('Por favor teclear un texto');
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    });


    res.status(201).json(tarea);
})

//Actualizar tarea 
const updateTareas = asyncHandler (async (req, res) => {
   
});

const deleteTareas = asyncHandler (async (req, res) => {
   
   const tarea = await Tarea.findById(req.params.id)
  
   if(!tarea){
        res.status(404)
        throw new Error('Tarea no existe')
   }  
   
   //verificamos que la tarea pertenezca al usuario autenticado
    if(tarea.user.toString() !== req.user.id) {
     res.status(401)
     throw new Error('Usuario no autorizado ')
    } else {
       await tarea.deleteOne()
       res.status(200).json({id: req.params.id, mensaje : 'Tarea eliminada'})
    }
});

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas,
}