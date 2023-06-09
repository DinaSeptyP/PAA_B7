import jwt from 'jsonwebtoken';
import { resolve } from 'styled-jsx/css';

export default function authorization(req, res){
    return new Promise((resolve,reject)=> {
        const { authorization } = req.headers;
        if(!authorization) return res.status(401).end();
    
        const authSplit = authorization.split(' ');
        // console.log(authSplit);
        const [authType, authToken] = [
            authSplit[0],
            authSplit[1]
        ]
        
        if(authType !== 'Bearer') return res.status(401).end();
    
        return jwt.verify(authToken, 'NothingToLose', function(err, decoded){
            if(err) return res.status(401).end();
            return resolve(decoded);
        });
    })

}