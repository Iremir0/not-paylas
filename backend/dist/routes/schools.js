import express from 'express';
import prisma from '../prismaClient.js';
const router = express.Router();
// GET all schools
router.get('/', async (req, res, next) => {
    try {
        const schools = await prisma.school.findMany();
        res.json(schools);
    }
    catch (err) {
        next(err);
    }
});
// GET school by ID
router.get('/:id', async (req, res, next) => {
    try {
        const school = await prisma.school.findUnique({ where: { id: Number(req.params.id) } });
        res.json(school);
    }
    catch (err) {
        next(err);
    }
});
// CREATE school
router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        const newSchool = await prisma.school.create({ data: { name } });
        res.json(newSchool);
    }
    catch (err) {
        next(err);
    }
});
// UPDATE school
router.put('/:id', async (req, res, next) => {
    try {
        const { name } = req.body;
        const updatedSchool = await prisma.school.update({
            where: { id: Number(req.params.id) },
            data: { name },
        });
        res.json(updatedSchool);
    }
    catch (err) {
        next(err);
    }
});
// DELETE school
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.school.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "School deleted" });
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=schools.js.map