const messagesController = {
    getCreateStandardMessage: (req, res) => {
        res.render('createStandard', { 
            type: "standard", 
            title: "Create Standard Message", 
            data: {} // On peut ajouter ici des données à passer à la vue
        });
    },
    getCreateSmartphoneMessage: (req, res) => {
        res.render('createSmartphone', { 
            type: "smartphone", 
            title: "Create Smartphone Message", 
            data: {} // On peut ajouter ici des données à passer à la vue
        });
    }
};

export default messagesController;
