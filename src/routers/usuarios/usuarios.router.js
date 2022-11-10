const express = require('express');
const Users = require('../../models/Users');
const { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById } = require('../../controllers/MongoDb');

const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const userObject = req.body
        const user = new Users(userObject)
        const responseDb = await insertDocument('hospital', 'users', user.initUser())
        res.send({
            ok: true,
            message: "Usuario creado.",
            info: responseDb
        })
    } catch (error) {
        if (Object.keys(error).length > 0) {
            res.status(500).send(error)
        } else {
            res.status(500).send({
                ok: true,
                message: "Usuario NO creado.",
                info: error.toString()
            })
        }
    }
})

router.get('/users', async (req, res) => {
    try {
        const responseDb = await getDocuments('hospital', 'users')
        const users = Users.removePassword(responseDb)
        res.send({
            ok: true,
            message: "Usuarios consultados",
            info: users
        })
    } catch (error) {
        const message = "Ha ocurrido un error en la consulta de usuarios."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await getDocumentById('hospital', 'users', id)
       delete responseDb.password
        res.send({
            ok: true,
            message: "Usuario consultado",
            info: responseDb
        })
    } catch (error) {
        const message = "Ha ocurrido un error consultando el usuario."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }

})

router.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userObject = req.body
        const user = new Users(userObject)

        const responseDb = await updateDocumentById('hospital', 'users', { id, data: user.initUser() })
        if (responseDb.modifiedCount > 0) {
            return res.status(200).send({
                ok: true,
                message: "Usuario actualizado.",
                info: userObject
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El usuario no existe.",
                info: ""
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error modificando el usuario."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await deleteDocumentById('hospital', 'users', id)
        if (responseDb.deletedCount === 1) {
            res.status(200).send({
                ok: true,
                message: "Usuario eliminado",
                info: ""
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El usuario no existe.",
                info: responseDb
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error eliminando el usuario."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

module.exports = router