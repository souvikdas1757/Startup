import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await prisma.announcement.findMany();
    res.json({ success: true, data: announcements });
  } catch (error) { next(error); }
};

export const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await prisma.announcement.create({ data: req.body });
    res.status(201).json({ success: true, data: announcement });
  } catch (error) { next(error); }
};

export const updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await prisma.announcement.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: announcement });
  } catch (error) { next(error); }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    await prisma.announcement.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) { next(error); }
};