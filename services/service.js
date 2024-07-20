const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { service } = require('../models/service');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM service";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all service : " + error;
    return messageError;
  }
  
}

async function create(service) {
  const requete = `INSERT INTO service 
  ( nom,description ) 
  VALUES 
  ('${service.nom}','${service.description}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating service';

  if (result.affectedRows) {
    message = 'service created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM service WHERE service_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting service';

  if (result.affectedRows) {
    message = 'service deleted successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM service WHERE service_id = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'service selcted successfully';
  }

  return { message };

}

async function modify(service) {
  const requete = "UPDATE service SET description = '" + service.description + "' nom = '" + service.nom + "' WHERE service_id = " + service.service_id;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'service updated successfully';
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
