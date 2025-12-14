import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const auth_header = req.headers.authorization;

    if (!auth_header || !auth_header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication invalid' });
    }

    const token = auth_header.split(' ')[1];

    try {
        const currentuser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = currentuser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication invalid' });
    }
};

export default authMiddleware;
