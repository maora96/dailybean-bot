const Suggest = require("../repositories/suggest");
const response = require("../controllers/response");

const addCharacter = async (ctx) => {
  // const userID = ctx.state.userID
  const {
    character_name = null,
    main_storyseries = null,
    author = null,
    genre = null,
    type_of_rep = null,
    gender = null,
    importance = null,
    sexual_orientation = null,
    romantic_orientation = null,
    relationships = null,
    pairing_qpp_or_romantic = null,
    rep_noteswarnings = null,
  } = ctx.request.body;

  if (
    !character_name &&
    !main_storyseries &&
    !author &&
    !genre &&
    !type_of_rep &&
    !gender &&
    !importance &&
    !sexual_orientation &&
    !romantic_orientation &&
    !relationships &&
    !pairing_qpp_or_romantic &&
    !rep_noteswarnings
  ) {
    response(ctx, 404, {
      message: "It's not possible to add an empty character.",
    });
  }

  const character = {
    character_name,
    main_storyseries,
    author,
    genre,
    type_of_rep,
    gender,
    importance,
    sexual_orientation,
    romantic_orientation,
    relationships,
    pairing_qpp_or_romantic,
    rep_noteswarnings,
  };

  console.log(character);
  const dbCharacter = await Suggest.addCharacter(character);

  response(ctx, 201, {
    character,
  });
};

const getRecentSuggested = async (ctx) => {
  const recentlyAdded = await Suggest.getRecentSuggested();
  if (recentlyAdded) {
    response(ctx, 201, {
      recentlyAdded,
    });
  } else {
    response(ctx, 404, {
      message: "No entries found.",
    });
  }
};

const getCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const character = await Characters.getCharacter(id);
    response(ctx, 201, { character: character });
  } else {
    response(ctx, 404, "ID can't be null.");
  }
};

const getAllCharacters = async (ctx) => {
  const characters = await Suggest.getAllCharacters();

  if (!characters) {
    response(ctx, 404, { message: "No characters found." });
  } else {
    response(ctx, 200, { characters: characters });
  }
};

module.exports = {
  addCharacter,
  getRecentSuggested,
  getCharacter,
  getAllCharacters,
};
