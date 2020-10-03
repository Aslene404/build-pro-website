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