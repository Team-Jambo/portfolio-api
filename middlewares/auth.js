import jwt from "jsonwebtoken";


export const checkUserSession = (req, res, next) =>{

    // check is session has a user
    if (req.session.user) {
        next()
    } else if(req.headers.authorization){
        // Extract token from headers
        const token = req.headers.authorization.split(' ')[1];


        // verify the token to get user
const user = jwt.verify(token, precess.env.JWT_PRIVATE_KEY);

        // Append user to request

        // call next function
        res.json(token);

     
    }else{
        res.status(401).json('User not authenticated');
    }
       
}