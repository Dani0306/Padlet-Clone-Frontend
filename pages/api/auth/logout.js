import { serialize } from "cookie";

export default function handleLogout(req, res){
    const { token } = req.cookies;

    if(!token) return res.status(401).json({ message: "You are not logged in" })

    const serialized = serialize("token", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    })

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
        message: "Logout successfull."
    })

}