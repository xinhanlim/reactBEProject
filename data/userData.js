const pool = require('../database');

async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email])
    return rows[0];
}

async function getUserById(id){
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    const user = rows[0];

    const [preferences] = await pool.query(`
        SELECT marketing_preferences.id, preference
        FROM user_marketing_preferences 
        JOIN marketing_preferences
        ON user_marketing_preferences.preference_id = marketing_preferences.id
        WHERE user_id = ?
      `, [id]);
      

    user.preferences = preferences; 
    return user;
}

async function createNewUser({name, email, password, salutation, marketing_preferences, country}){
    let connection = null;
    try{
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [userInsert] = await connection.query(`INSERT INTO users (name, email, password, salutation, country) VALUES (?,?,?,?,?)`,
                            [name, email, password, salutation, country]
        )


        const user_id = userInsert.insertId;

        if(Array.isArray(marketing_preferences)){
            for (const preference of marketing_preferences){
                const [preferenceInsert] = await connection.query(`
  SELECT id FROM marketing_preferences WHERE preference = ?`, [preference]);


            if(preferenceInsert.length === 0) {
                throw new Error (`invalid marketing preference: ${preference}`)
            }

            const preference_id = preferenceInsert[0].id;
            await connection.query(`INSERT INTO user_marketing_preferences (user_id, preference_id) VALUES (?, ?)`,
                [user_id, preference_id]
            )
        }
    }
        await connection.commit();
        return user_id;
    } catch (e) {
        console.log(e);
        await connection.rollback();
    } finally {
    connection.release();
    }
}

async function updateUser(id, {name, email, salutation,marketing_preferences, country}){
    let connection = null;
    try{
    connection = await pool.getConnection();
    await connection.beginTransaction();

        await connection.query(`UPDATE users SET name = ?, email = ?, salutation = ?, country = ? WHERE id = ?`,
        [name , email, salutation, country, id]
    );

        await connection.query(`DELETE FROM user_marketing_preferences WHERE user_id = ? `, [id])

        if (Array.isArray(marketing_preferences)) {
            for (const preference of marketing_preferences) {
              const [preferenceRows] = await connection.query(
                `SELECT id FROM marketing_preferences WHERE preference = ?`,
                [preference]
              );
          
              if (preferenceRows.length === 0) {
                throw new Error(`Invalid marketing preference: ${preference}`);
              }

              console.log(preferenceRows)
          
              const preference_id = preferenceRows[0].id;
          
              await connection.query(
                `INSERT INTO user_marketing_preferences (user_id, preference_id) VALUES (?, ?)`,
                [id, preference_id]
              );
            }
          }
          
    await connection.commit();
 } catch(e) {
    console.log(e);
    await connection.rollback();

 } finally {
    connection.release();
 }
}

async function deleteUser(){
    try{
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        await connection.query(`DELETE FROM user_marketing_preferences WHERE user_id = ? `, [id])
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