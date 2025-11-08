import express from 'express';
import prisma from '../prismaClient.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
// CREATE rating & update avgRating
router.post('/', auth, async (req, res, next) => {
    try {
        const { userId, noteId, rating } = req.body;
        const newRating = await prisma.rating.create({
            data: { userId, noteId, rating: Number(rating) }
        });
        // AvgRating güncelle
        const ratings = await prisma.rating.findMany({ where: { noteId } });
        const avg = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;
        await prisma.note.update({
            where: { id: noteId },
            data: { avgRating: avg }
        });
        res.json(newRating);
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=ratings.js.map