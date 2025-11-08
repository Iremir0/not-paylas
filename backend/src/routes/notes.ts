import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import prisma from '../prismaClient.js';
import multer from 'multer';
import AWS from 'aws-sdk';
const router = express.Router();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});
const upload = multer({ storage: multer.memoryStorage() });

// CREATE note with file upload
router.post('/', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, schoolId, departmentId, className, teacher, title, description } = req.body;
        if (!req.file) return res.status(400).json({ message: "File is required" });

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${Date.now()}-${req.file.originalname}`,
            Body: req.file.buffer,
        };

        const s3Result = await s3.upload(params).promise();

        const note = await prisma.note.create({
            data: {
                userId,
                schoolId: Number(schoolId),
                departmentId: Number(departmentId),
                className,
                teacher,
                title,
                description,
                fileUrl: s3Result.Location,
            },
        });

        res.json(note);
    } catch (err) { next(err); }
});

// GET all notes
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await prisma.note.findMany({ include: { user: true, ratings: true, comments: true } });
        res.json(notes);
    } catch (err) { next(err); }
});

// DELETE note
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.note.delete({ where: { id: req.params.id } });
        res.json({ message: "Note deleted" });
    } catch (err) { next(err); }
});

export default router;
