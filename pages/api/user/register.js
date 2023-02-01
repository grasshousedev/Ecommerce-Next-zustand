import {client} from "../../../lib/client";
import bcrypt from 'bcryptjs'
import {signToken} from "../../../utils/auth"

export default async function handler(req, res) {
    
    switch(req.method){
        case "POST": 
            const userExist= await client.fetch(
            `*[_type == "user" && email == $email][0]`, 
            {
            email: req.body.email
            })
            
            if(userExist){
                return res.status(401).send({message: 'Email already exists'})
            } 
            const newUser = await JSON.parse(req.body);
            try {
                await client.create({
                    _type: "user",
                    name: newUser.name,
                    email: newUser.email,
                    password: bcrypt.hashSync(newUser.password),
                    isAdmin: false,

                })
                .then((data)=> {
                    res.status(200).json(data._id)
                })
                
            } catch (error) {
                console.log(error);
                res.status(500).json({msg: "Error, check console."})

            }
        break;
    }
    const token= signToken(newUser)
    res.send({...newUser, token})
    
}