import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import prisma from '../prismaClient.js';
const router = express.Router();

// GET all comments
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await prisma.comment.findMany({ include: { user: true, note: true } });
        res.json(comments);
    } catch (err) { next(err); }
});

// GET comment by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
        res.json(comment);
    } catch (err) { next(err); }
});

// CREATE comment
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, noteId, content } = req.body;
        const newComment = await prisma.comment.create({
            data: { userId, noteId, content }
        });
        res.json(newComment);
    } catch (err) { next(err); }
});

// UPDATE comment
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;
        const updatedComment = await prisma.comment.update({
            where: { id: req.params.id },
            data: { content },
        });
        res.json(updatedComment);
    } catch (err) { next(err); }
});

// DELETE comment
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.comment.delete({ where: { id: req.params.id } });
        res.json({ message: "Comment deleted" });
    } catch (err) { next(err); }
});

export default router;
