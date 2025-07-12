const pool = require('../database');

async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email])
    return rows[0];
}

async function getUserById(id){
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id])
    const user = rows[0];

    const [preferences] = await pool.query(`SELECT perference_id, perference_name FROM user_marketing_preferences 
                                            JOIN maketing_preferences
                                            ON user_marketing_preferences.preferences_id = marketing_perferences.id
                                            WHERE users_id = ? `,[id])

    user.preferences = preferences; 
    return user;
}

async function createNewUser(name, email, password, salutation, marketing_perferences, country){
    try{
        const connection = pool.getConnection();
        await connection.beginTransaction();

        const [userInsert] = await pool.query(`INSERT INTO users (name, email, password, salutation, country) VALUES (?,?,?,?,?)`,
                            [name, email, password, salutation, country]
        )

        const user_id = userInsert.insertId;

        if(Array.isArray(marketing_perferences)){
            for (const preference of marketing_perferences){
                const [preferenceInsert] = await connection.query(`
                    SELECT id FROM marketing_preferences WHERE preferences = ? `, [preference])

            if(preferenceInsert.length === 0) {
                throw new Error (`invalid marketing perference: ${preference}`)
            }

            const preference_id = preferenceInsert[0].id;
            await connection.query(`INSERT INTO user_marketing_preferences (user_id, perference_id) VALUES (?, ?)`,
                [user_id, preference_id]
            )
        }
        await connection.commit();
    }
    } catch {
        await connection.rollback();
    } finally {
    connection.release();
    }
}

async function updateUser(){
 try{
    const connection = await pool.getConnection();
    await connection.beginTransaction();

        await pool.query(`UPDATE users SET name = ?, email = ?, salutation = ?, country = ?, WHERE id = ?`,
        [name , email, salutation, country, id]
    );

        await pool.query
    (`DELETE user_marketing_preferences WHERE user_id = ? `, [id])

    if(Array.isArray(marketing_perferences)){
        for (const preference of marketing_perferences){
                await connection.query(
                `SELECT id FROM marketing_preferences WHERE perference = ?`,
                [preference]
            )
        }
        if(preferenceUpdate === 0 ){
            throw new Error (`Invalid marketing perferenec : ${perferenec}`)
        }

        const preference_id = perferenceUpdate[0].id;
        await connection.query(`INSERT into user_marketing_perferences (user_id, perference_id) VALUES (?, ?)`, [user_id, preference_id])
    }
    await connection.commit();
 } catch {
    await connection.rollback();

 } finally {
    connection.release();
 }
}

async function deleteUser(){
    try{
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        await connection.query(`DELETE FROM user_marketing_preference WHERE user_id = ? `, [id])
        await connection.query(`DELETE FROM users WHERE user_id = ? `, [id])
  
        await connection.commit();
    } catch {
        await connection.rollback();
    } finally {
        connection.release();
    } 
}

module.exports = {
    getUserByEmail,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}