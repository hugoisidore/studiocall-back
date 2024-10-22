import ApiError from '../errors/ApiError.js';

const messagesController = {
    async getCreateStandardMessage (req, res, next) {
        try {
            res.render('createStandard', { 
                type: "standard", 
                title: "Create Standard Message", 
                data: {} // On peut ajouter ici des données à passer à la vue
            });
        } catch (error) {
            console.error("Erreur lors du rendu de la vue createStandard:", error);
            return next(new ApiError(500, "Erreur lors du rendu de la vue Create Standard Message"));
        }
    },
    
    async getCreateSmartphoneMessage (req, res, next) {
        try {
            res.render('createSmartphone', { 
                type: "smartphone", 
                title: "Create Smartphone Message", 
                data: {} // On peut ajouter ici des données à passer à la vue
            });
        } catch (error) {
            console.error("Erreur lors du rendu de la vue createSmartphone:", error);
            return next(new ApiError(500, "Erreur lors du rendu de la vue Create Smartphone Message"));
        }
    },

    async getExamplesMessage (req, res, next) {
        try {
            res.render('examplesMessages', { 
                title: "Examples of messages", 
                data: {} // On peut ajouter ici des données à passer à la vue
            });
        } catch (error) {
            console.error("Erreur lors du rendu de la vue examplesMessages:", error);
            return next(new ApiError(500, "Erreur lors du rendu de la vue examplesMessages"));
        }
    }
};

export default messagesController;
