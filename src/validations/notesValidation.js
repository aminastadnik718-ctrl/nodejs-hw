import { isValidObjectId } from 'mongoose';
import { Joi } from 'celebrate';
import { TAGS } from '../constants/tags.js';

const noteId = Joi.string().custom((value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid noteId');
  }

  return value;
});

const noteFields = {
  title: Joi.string().min(1),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
};

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId,
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: noteFields.title.required(),
    content: noteFields.content,
    tag: noteFields.tag,
  }),
};

export const updateNoteSchema = {
  params: Joi.object({
    noteId,
  }),
  body: Joi.object(noteFields).min(1),
};