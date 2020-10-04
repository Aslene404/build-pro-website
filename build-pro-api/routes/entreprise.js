var express = require('express');
var router = express.Router();
var Entreprise = require('../db/models/entreprise-schemas');

router.post('/send', async function (req, res) {
    
    let new_entreprise = req.body;
    let entreprise = await Entreprise.create(new_entreprise);
    if (!entreprise) {
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
            payload: entreprise
        });
    }
});

router.get('/all', async function (req, res) {
    await Entreprise.find({}, function (err, entreprises) {
        if (err) {
            res.json({
                status: "error",
                message: "Echec d'obtenir les entreprises",
                payload: null
            });
        }
        res.json({
            status: "success",
            message: "Tout les entreprises",
            payload: entreprises
        });
    });
});
// Update Entreprise 
router.put('/update/:id', async function (req, res) {
    let entrepriseId = req.params.id;
    let e_projects = req.body.e_projects ? req.body.e_projects : []; 
    let services = req.body.services ? req.body.services : []; 

    await Entreprise.findById(entrepriseId,
        async function (error, _entreprise) {
            if (error) {
                res.json({
                    status: "error",
                    message: "Fail to Update Entreprise",
                    payload: null
                });
            } else {
                _entreprise.e_projects = e_projects;
                _entreprise.services = services;
                await _entreprise.save(function (error, doc) {
                    if (error) {
                        res.json({
                            status: "error",
                            message: "Fail to Update Entreprise ",
                            payload: null
                        });
                    } else {
                        res.json({
                            status: "success",
                            message: "Entreprise Updated successfully",
                            payload: doc
                        });
                    }
                });
            }
        });
});


// Delete User
router.delete('/delete/:id', async function (req, res) {
    let entrepriseId = req.params.id;
    await Entreprise.findByIdAndRemove(entrepriseId, function (err, doc) {
        if (err) {
            res.json({
                status: "error",
                message: "Echec de supprimer l'entreprise",
                payload: null
            });
        } else {
            res.json({
                status: "success",
                message: "Entreprise supprimé avec succès",
                payload: doc
            });
        }
    });
});


module.exports = router;