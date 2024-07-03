const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Récupérer le token d'authentification du header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Aucun token, renvoyer un statut non autorisé
    }

    // Vérifier le token
    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token invalide, renvoyer un statut interdit
        }
        req.user = user;
        next(); // Continuer vers la prochaine étape
    });
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

module.exports = {
    generateAccessToken,
    authenticateToken
}