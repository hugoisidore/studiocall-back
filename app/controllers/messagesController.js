const messagesController = {
    getCreateStandardMessage: (req, res) => {
        res.json({
            type: "standard",
            title: "Create Standard Message",
            data: { /* any additional data you want to send */ }
        });
    },
    getCreateSmartphoneMessage: (req, res) => {
        res.json({
            type: "smartphone",
            title: "Create Smartphone Message",
            data: { /* any additional data you want to send */ }
        });
    }
};

export default messagesController;