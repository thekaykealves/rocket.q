const Database = require('../db/config');

module.exports = {
    async create(req, res) {
        const db = await Database();
        const pass = req.body.password;
        let roomId;
        let isRoom = true;

        while(isRoom){
            // Gerar o número da sala
            for(let i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomExistIds = await db.all(`SELECT id FROM rooms`);
            isRoom = roomExistIds.some(roomExistId => roomExistId === roomId);

            if(!isRoom){
                // Inserir a sala no banco de dados
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    "${pass}"
                )`)
            }
        }

        await db.close();
        
        res.redirect(`/room/${roomId}`)
    },

    enter(req, res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database();

        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`);
        let isQuestions = true;

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isQuestions = false
            }
        }

        res.render('room', {roomId, questions, questionsRead, isQuestions});
    }
}