import jwt from 'jsonwebtoken';

const authUser =  async (req, res, next) => {
    try {

        const {token} = req.headers
        console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: 'Invalid or malformed token' });
        }

       
        req.user = decoded.id;

        next();
        
    } catch (error) {
        console.error('Error in authUser:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
        }
        // For JsonWebTokenError (invalid signature, etc.)
        return res.status(401).json({ success: false, message: 'Authentication failed: Invalid token.' });
    }

}

export default authUser;
    