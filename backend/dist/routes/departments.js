import express from 'express';
import prisma from '../prismaClient.js';
const router = express.Router();
// GET all departments
router.get('/', async (req, res, next) => {
    try {
        const departments = await prisma.department.findMany();
        res.json(departments);
    }
    catch (err) {
        next(err);
    }
});
// GET department by ID
router.get('/:id', async (req, res, next) => {
    try {
        const department = await prisma.department.findUnique({ where: { id: Number(req.params.id) } });
        res.json(department);
    }
    catch (err) {
        next(err);
    }
});
// CREATE department
router.post('/', async (req, res, next) => {
    try {
        const { name, schoolId } = req.body;
        const newDepartment = await prisma.department.create({ data: { name, schoolId: Number(schoolId) } });
        res.json(newDepartment);
    }
    catch (err) {
        next(err);
    }
});
// UPDATE department
router.put('/:id', async (req, res, next) => {
    try {
        const { name, schoolId } = req.body;
        const updatedDepartment = await prisma.department.update({
            where: { id: Number(req.params.id) },
            data: { name, schoolId: Number(schoolId) },
        });
        res.json(updatedDepartment);
    }
    catch (err) {
        next(err);
    }
});
// DELETE department
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.department.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "Department deleted" });
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=departments.js.map