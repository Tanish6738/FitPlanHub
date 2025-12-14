export const requireTrainer = (req, res, next) => {
    if (req.user && req.user.role === 'trainer') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Trainers only.' });
    }
};

export const requireUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Users only.' });
    }
};
