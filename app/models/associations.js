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
    as:"users_voice",
    through:"user_voice",
    foreignKey:"voice_id"
});

User.belongsToMany(Voice,{
    as:"voices_user",
    through:"user_voice",
    foreignKey:"user_id"
});

//Music
Music.belongsToMany(User,{
    as:"users_music",
    through:"user_music",
    foreignKey:"music_id"
});

User.belongsToMany(Music,{
    as:"musics_user",
    through:"user_music",
    foreignKey:"user_id"
});

//Text
Text.belongsToMany(User,{
    as:"users_text",
    through:"user_text",
    foreignKey:"text_id"
});

User.belongsToMany(Text,{
    as:"texts_user",
    through:"user_text",
    foreignKey:"user_id"
});

export { Voice, Music, Text, Form, User, sequelize };