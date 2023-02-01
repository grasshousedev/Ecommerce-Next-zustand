import {client} from "../../../lib/client";
import bcrypt from 'bcryptjs'
import {signToken} from "../../../utils/auth"

export default async function handler(req, res) {
    
    switch(req.method){
        case "POST":    
        try {
           const user= await client.fetch(`*[_type == "user" && email == $email][0]`, {
            email: req.body.email,
           })
           if( user && bcrypt.compareSync(req.body.password, user.password)){
            const token= signToken({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token,
            })
        } else{
            res.status(401).send({message: "Invalid email or password"})
        }
        const token= signToken(newUser)
        res.send({...newUser, token})
        
    
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Error, check console."})

        }
      break;
    }

    
}