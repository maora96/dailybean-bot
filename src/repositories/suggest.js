const database = require("../utils/database");

const addCharacter = async (character) => {
  const q = {
    text:
      "INSERT INTO suggestions (id, character_name, main_storyseries, author, genre, type_of_rep, gender, importance,sexual_orientation, romantic_orientation, relationships, pairing_qpp_or_romantic, rep_noteswarnings) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    values: [
      character.character_name,
      character.main_storyseries,
      character.author,
      character.genre,
      character.type_of_rep,
      character.gender,
      character.importance,
      character.sexual_orientation,
      character.romantic_orientation,
      character.relationships,
      character.pairing_qpp_or_romantic,
      character.rep_noteswarnings,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getRecentSuggested = async () => {
  const q = {
    text: "SELECT * FROM suggestions ORDER BY id DESC LIMIT 4;",
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllCharacters = async () => {
  const q = {
    text: "SELECT * FROM suggestions",
  };

  const query = await database.query(q);
  return query.rows;
};

const getCharacter = async (id) => {
  const q = {
    text: "SELECT * FROM suggestions where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const deleteCharacter = async (id) => {
  const q = {
    text: "DELETE FROM suggestions where id = $1 RETURNING *",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  addCharacter,
  getRecentSuggested,
  getAllCharacters,
  getCharacter,
  deleteCharacter,
};
