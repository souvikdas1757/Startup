import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAssignments = async (req, res, next) => {
  try {
    const assignments = await prisma.assignment.findMany();
    res.json({ success: true, data: assignments });
  } catch (error) { next(error); }
};

export const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await prisma.assignment.findUnique({ where: { id: req.params.id } });
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });
    res.json({ success: true, data: assignment });
  } catch (error) { next(error); }
};

export const createAssignment = async (req, res, next) => {
  try {
    const assignment = await prisma.assignment.create({ data: req.body });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) { next(error); }
};

export const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await prisma.assignment.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: assignment });
  } catch (error) { next(error); }
};

export const deleteAssignment = async (req, res, next) => {
  try {
    await prisma.assignment.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (error) { next(error); }
};