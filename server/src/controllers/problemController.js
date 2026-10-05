import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getProblems = async (req, res, next) => {
  try {
    const problems = await prisma.codingProblem.findMany();
    res.json({ success: true, data: problems });
  } catch (error) { next(error); }
};

export const getProblemById = async (req, res, next) => {
  try {
    const problem = await prisma.codingProblem.findUnique({ where: { id: req.params.id } });
    if (!problem) return res.status(404).json({ success: false, message: 'Problem not found' });
    res.json({ success: true, data: problem });
  } catch (error) { next(error); }
};

export const createProblem = async (req, res, next) => {
  try {
    const problem = await prisma.codingProblem.create({ data: req.body });
    res.status(201).json({ success: true, data: problem });
  } catch (error) { next(error); }
};

export const updateProblem = async (req, res, next) => {
  try {
    const problem = await prisma.codingProblem.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: problem });
  } catch (error) { next(error); }
};

export const deleteProblem = async (req, res, next) => {
  try {
    await prisma.codingProblem.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Problem deleted' });
  } catch (error) { next(error); }
};