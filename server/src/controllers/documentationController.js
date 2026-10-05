import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDocumentation = async (req, res, next) => {
  try {
    const docs = await prisma.documentation.findMany();
    res.json({ success: true, data: docs });
  } catch (error) { next(error); }
};

export const getDocumentationBySlug = async (req, res, next) => {
  try {
    const doc = await prisma.documentation.findUnique({ where: { slug: req.params.slug } });
    if (!doc) return res.status(404).json({ success: false, message: 'Documentation not found' });
    res.json({ success: true, data: doc });
  } catch (error) { next(error); }
};

export const createDocumentation = async (req, res, next) => {
  try {
    const doc = await prisma.documentation.create({ data: req.body });
    res.status(201).json({ success: true, data: doc });
  } catch (error) { next(error); }
};

export const updateDocumentation = async (req, res, next) => {
  try {
    const doc = await prisma.documentation.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: doc });
  } catch (error) { next(error); }
};

export const deleteDocumentation = async (req, res, next) => {
  try {
    await prisma.documentation.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Documentation deleted' });
  } catch (error) { next(error); }
};