import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const updateMe = async (req, res, next) => {
  try {
    const user = await prisma.user.update({ where: { id: req.user.id }, data: req.body });
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const getMyStatistics = async (req, res, next) => {
  try {
    const notesUploaded = await prisma.note.count({ where: { uploadedBy: req.user.id } });
    const assignmentsSubmitted = await prisma.submission.count({ where: { studentId: req.user.id } });
    const bookmarksCount = await prisma.bookmark.count({ where: { userId: req.user.id } });
    res.json({ success: true, data: { notesUploaded, assignmentsSubmitted, bookmarksCount } });
  } catch (error) { next(error); }
};