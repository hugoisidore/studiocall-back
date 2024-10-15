import { Voice } from "./voice.js";
import { Music } from "./music.js";
import { Text } from "./text.js";
import { Form } from "./form.js";
import { User } from "./user.js";

import { sequelize } from "./sequelizeClient.js"; 

//User
User.hasMany(Voice,{
    as: "voice",
    foreignKey: "user_id"
});

User.hasMany(Music,{
    as: "music",
    foreignKey: "user_id"
});

User.hasMany(Text,{
    as: "text",
    foreignKey: "user_id"
});

User.hasMany(Form,{
    as: "form",
    foreignKey: "user_id"
});

//Form
Form.belongsTo(User,{
    as: "user",
    foreignKey: "user_id"
});

//Voice 
Voice.belongsToMany(User,{
    as: "user",
    foreignKey: "user_id"
});

//Music
Music.belongsToMany(User,{
    as: "user",
    foreignKey: "user_id"
});

//Text 
Text.belongsToMany(User,{
    as: "user",
    foreignKey: "user_id"
});


export { Voice, sequelize };