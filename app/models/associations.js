import { Voice } from "./voice.js";
import { Music } from "./music.js";
import { Text } from "./text.js";
import { Form } from "./form.js";
import { User } from "./user.js";

import { sequelize } from "./sequelizeClient.js"; 

//Form
Form.belongsTo(User,{
    as:"user",
    foreignKey:"user_id"
});

User.hasMany(Form,{
    as:"forms",
    foreignKey:"user_id"
});

//Voice 
Voice.belongsToMany(User,{
    as:"users",
    through:"user_voice",
    foreignKey:"voice_id"
});

User.belongsToMany(Voice,{
    as:"voices",
    through:"user_voice",
    foreignKey:"user_id"
});


export { Voice, sequelize };