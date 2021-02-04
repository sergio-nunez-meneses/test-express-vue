const db = require('../models/index');
const ash = require('express-async-handler');
const { Op } = require('sequelize');

const Joi = require('joi');
const schema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(20)
    .required(),
  description: Joi.string()
    .min(5)
    .max(40)
    .required()
})

exports.create = ash(async function(req, res) {
  console.log(req.body); // debug

  if (req.body.title === null && req.body.description === null) {
    res.status(400).send({
      error: 'Content can not be empty'
    });
    return;
  }

  const formValidation = schema.validate(req.body);

  if (formValidation.error) {
    res.status(400).send({
      error: formValidation.error.details[0].message
    });
    return;
  }

  const thing = await db.Thing.create({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  if (!thing) {
    res.status(500).send({
      error: 'An error occurred while creating your Thing'
    });
    return;
  }

  res.status(200).send({
    message: 'Thing created successfully'
  });
  return;
});

exports.findAll = ash(async function(req, res) {
  console.log(req.query); // debug

  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const things = await db.Thing.findAll({
    where: condition
  });

  if (!things) {
    res.status(500).send({
      error: 'An error occurred while retrieving  Things'
    });
    return;
  }

  res.status(200).send(things);
  return;
});

exports.findOne = ash(async function(req, res) {
  console.log(req.params); // debug

  const id = { id: req.params.id };
  const thing = await db.Thing.findOne({
    where: id
  });

  if (!thing) {
    res.status(500).send({
      error: 'Error retrieving Thing with id=' + req.params.id
    });
    return;
  }

  res.status(200).send(thing);
  return;
});
