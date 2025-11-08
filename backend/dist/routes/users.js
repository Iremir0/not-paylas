import express from 'express'; // Router gibi değerler için normal import
import prisma from '../prismaClient.js';
const { Router } = express;
const router = Router();
// GET all users
router.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
// GET user by ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } });
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
// CREATE new user
router.post('/', async (req, res, next) => {
    try {
        const { name, email, passwordHash } = req.body;
        const newUser = await prisma.user.create({ data: { name, email, passwordHash } });
        res.json(newUser);
    }
    catch (err) {
        next(err);
    }
});
// UPDATE user
router.put('/:id', async (req, res, next) => {
    try {
        const { name, email, passwordHash } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: req.params.id },
            data: { name, email, passwordHash },
        });
        res.json(updatedUser);
    }
    catch (err) {
        next(err);
    }
});
// DELETE user
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.user.delete({ where: { id: req.params.id } });
        res.json({ message: "User deleted" });
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=users.js.map