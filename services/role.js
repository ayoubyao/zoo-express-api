const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { role } = require('../models/role');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM role";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all role : " + error;
    return messageError;
  }
  
}

async function create(role) {
  const requete = `INSERT INTO role 
  ( label ) 
  VALUES 
  ('${role.label}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating role';

  if (result.affectedRows) {
    message = 'role created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM role WHERE role_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting role';

  if (result.affectedRows) {
    message = 'role deleted successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM role WHERE role_id = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'role successfully';
  }

  return { message };

}

async function modify(role) {
  const requete = "UPDATE role SET label = '" + role.label + "' WHERE role_id = " + role.role_id;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'role modified successfully';
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
