import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getNotes = async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany();
    res.json({ success: true, data: notes });
  } catch (error) { next(error); }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({ where: { id: req.params.id } });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.json({ success: true, data: note });
  } catch (error) { next(error); }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await prisma.note.create({ data: req.body });
    res.status(201).json({ success: true, data: note });
  } catch (error) { next(error); }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await prisma.note.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: note });
  } catch (error) { next(error); }
};

export const deleteNote = async (req, res, next) => {
  try {
    await prisma.note.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Note deleted' });
  } catch (error) { next(error); }
};