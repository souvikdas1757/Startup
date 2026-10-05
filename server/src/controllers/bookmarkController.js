import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({ where: { userId: req.user.id } });
    res.json({ success: true, data: bookmarks });
  } catch (error) { next(error); }
};

export const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await prisma.bookmark.create({ data: { ...req.body, userId: req.user.id } });
    res.status(201).json({ success: true, data: bookmark });
  } catch (error) { next(error); }
};

export const deleteBookmark = async (req, res, next) => {
  try {
    await prisma.bookmark.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Bookmark removed' });
  } catch (error) { next(error); }
};