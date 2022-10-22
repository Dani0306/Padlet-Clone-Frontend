import { serialize } from 'cookie'
import axios from 'axios'
import { host } from '../../../variables';

export default async function registerHandler (req, res) {
    const { email, username, profile } = req.body;

    const response = await axios.post(host + '/auth/register', { email, username, profile });

    if(response.status === 200){
        const serialized = serialize("token", response.data.token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 100 * 60 * 60 * 24 * 30, 
            path: "/"
        })

        res.setHeader("Set-Cookie", serialized)
    
         return res.status(200).json({
            user: response.data.user, 
         })    
    } else return res.status(404).json({
        error: response.data.message
    })
}