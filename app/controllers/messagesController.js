const messagesController = {
    getCreateStandardMessage: (req, res) => {
        res.render("createStandard"); // on aura une vue createStandard
    },
    getCreateSmartphoneMessage: (req, res) => {
        res.render("createSmartphone"); // on aura une vue createSmartphone
    }
};

export default messagesController;
