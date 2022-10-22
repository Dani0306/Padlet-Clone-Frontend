import { serialize } from 'cookie'
import axios from 'axios'
import { host } from '../../../variables';

export default async function loginHandler (req, res) {
    const { email } = req.body;

    const response = await axios.post(host + '/auth/login', { email });

    if(response.status === 200){
        const serialized = serialize("token", response.data.token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        })

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({
            user: response.data.user
        })
    } else return res.status(404).json({
        error: response.data.message
    })


}