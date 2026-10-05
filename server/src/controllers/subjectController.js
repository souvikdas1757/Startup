import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        _count: { select: { notes: true, assignments: true } }
      }
    });
    // Format response to include counts for the frontend
    const formatted = subjects.map(s => ({
      ...s,
      notes: s._count.notes,
      assignments: s._count.assignments,
    }));
    res.json({ success: true, data: formatted });
  } catch (error) { next(error); }
};

export const getSubjectById = async (req, res, next) => {
  try {
    const subject = await prisma.subject.findUnique({ 
      where: { id: req.params.id },
      include: {
        _count: { select: { notes: true, assignments: true } }
      }
    });
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    res.json({ success: true, data: { ...subject, notes: subject._count.notes, assignments: subject._count.assignments } });
  } catch (error) { next(error); }
};

export const createSubject = async (req, res, next) => {
  try {
    const { name, code, teacher, semester, branch, section, description, thumbnail } = req.body;
    const subject = await prisma.subject.create({ 
      data: { name, code, teacher, semester, branch, section, description, thumbnail } 
    });
    res.status(201).json({ success: true, data: { ...subject, notes: 0, assignments: 0 } });
  } catch (error) { next(error); }
};

export const updateSubject = async (req, res, next) => {
  try {
    const { name, code, teacher, semester, branch, section, description, thumbnail } = req.body;
    const subject = await prisma.subject.update({ 
      where: { id: req.params.id }, 
      data: { name, code, teacher, semester, branch, section, description, thumbnail } 
    });
    res.json({ success: true, data: { ...subject, notes: 0, assignments: 0 } });
  } catch (error) { next(error); }
};

export const deleteSubject = async (req, res, next) => {
  try {
    await prisma.subject.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Subject deleted' });
  } catch (error) { next(error); }
};