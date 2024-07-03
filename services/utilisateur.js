const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { utilisateur } = require('../models/utilisateur');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM utilisateur";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all utilisateur : " + error;
    return messageError;
  }
  
}

async function create(utilisateur) {
  const requete = `INSERT INTO utilisateur 
  ( username,password,nom,prenom,role_id ) 
  VALUES 
  ('${utilisateur.username}','${utilisateur.password}','${utilisateur.nom}','${utilisateur.prenom}',${utilisateur.role_id})`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating utilisateur';

  if (result.affectedRows) {
    message = 'utilisateur created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM utilisateur WHERE utilisateurid = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating utilisateur';

  if (result.affectedRows) {
    message = 'utilisateur created successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM utilisateur WHERE submenuid = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'utilisateur created successfully';
  }

  return { message };

}

async function modify(utilisateur) {
  const requete = "UPDATE utilisateur SET path = '" + utilisateur.path + "' WHERE utilisateurid = " + utilisateur.utilisateurid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'utilisateur created successfully';
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
