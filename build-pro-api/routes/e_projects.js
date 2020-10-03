var express = require('express');
var router = express.Router();
var e_projects = require('../db/models/e_projects-schemas');

router.post('/send', async function (req, res) {
    
    let new_e_projects = req.body;
    let e_projects = await e_projects.create(new_e_projects);
    if (!e_projects) {
        res.json({
            status: "failed",
            message: "Echec d'envoi de votre demande",
            payload: null
        });
    }
    else {
        res.json({
            status: "success",
            message: "Votre demande est envoyée avec succès",
            payload: e_projects
        });
    }
});

router.get('/all', async function (req, res) {
    await e_projects.find({}, function (err, e_projectss) {
        if (err) {
            res.json({
                status: "error",
                message: "Echec d'obtenir les e_projects",
                payload: null
            });
        }
        res.json({
            status: "success",
            message: "Tout les e_projects",
            payload: e_projectss
        });
    });
});

// Delete User
router.delete('/delete/:id', async function (req, res) {
    let e_projectsId = req.params.id;
    await e_projects.findByIdAndRemove(e_projectsId, function (err, doc) {
        if (err) {
            res.json({
                status: "error",
                message: "Echec de supprimer le e_project",
                payload: null
            });
        } else {
            res.json({
                status: "success",
                message: "e_project supprimé avec succès",
                payload: doc
            });
        }
    });
});


module.exports = router;