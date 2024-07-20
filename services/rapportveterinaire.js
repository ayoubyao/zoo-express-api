const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { rapportveterinaire } = require('../models/rapportveterinaire');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM rapportveterinaire";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all rapportveterinaire : " + error;
    return messageError;
  }
  
}

async function create(rapportveterinaire) {
  const requete = `INSERT INTO rapportveterinaire 
  ( date,detail,id_utilisateur,animal_id ) 
  VALUES 
  ('${rapportveterinaire.date}','${rapportveterinaire.detail}',${rapportveterinaire.id_utilisateur},${rapportveterinaire.animal_id})`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating rapportveterinaire';

  if (result.affectedRows) {
    message = 'rapportveterinaire created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM rapportveterinaire WHERE rapport_veterinaire_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting rapportveterinaire';

  if (result.affectedRows) {
    message = 'rapportveterinaire deleted successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM rapportveterinaire WHERE rapport_veterinaire_id = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'rapportveterinaire created successfully';
  }

  return { message };

}

async function modify(rapportveterinaire) {
  const requete = "UPDATE rapportveterinaire SET detail = '" + rapportveterinaire.detail + "' date = '" + rapportveterinaire.date + "' WHERE rapport_veterinaire_id = " + rapportveterinaire.rapport_veterinaire_id;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'rapportveterinaire modified successfully';
  }

  return { message };
}

module.exports = {
  create,
  remove,
  select,
  modify,
  selectAll
}
