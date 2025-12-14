import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const auth_header = req.headers.authorization;

    console.log("Auth Header:", auth_header); 
    if (!auth_header || !auth_header.startsWith('Bearer ')) {
        console.log("Auth failed: Missing or invalid header format"); // Debug log
        return res.status(401).json({ message: 'Authentication invalid' });
    }

    const token = auth_header.split(' ')[1];
    console.log("Token received:", token); 

    try {
        const currentuser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = currentuser;
        next();
    } catch (error) {
        console.log("Auth failed: Token verification error:", error.message); // Debug log
        return res.status(401).json({ message: 'Authentication invalid' });
    }
};

export default authMiddleware;
