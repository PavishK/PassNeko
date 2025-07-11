import JWT from 'jsonwebtoken';

const secret=process.env.JWT_SECRET;

export const signToken=(payload)=>{
    const token= JWT.sign(payload,secret,{expiresIn:'1h'});
    return token;
}

export const verifyToken=(jwttoken)=>{
    try {
        return JWT.verify(jwttoken, secret);
    } catch (error) {
        return null;
    }
}