export function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    // JWT doğrulama buraya eklenebilir
    next();
}
//# sourceMappingURL=auth.js.map