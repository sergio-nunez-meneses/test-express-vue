const db = require('../models/index');
const ash = require('express-async-handler');

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
