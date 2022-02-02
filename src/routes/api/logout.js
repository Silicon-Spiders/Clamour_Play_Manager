export const post = (req) => {
    return{
        headers: {
            "Set-Cookie": [
                `user=; path=/; max-age=31536000`,
                `role=; path=/; max-age=31536000`,
                `token=; path=/; HttpOnly; max-age=31536000`,
                `userid=; path=/; HttpOnly; max-age=31536000`,
            ],
            location: "/login",
        }
    }
    
}