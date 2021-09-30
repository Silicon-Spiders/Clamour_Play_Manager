export const post = (req) => {
    if(req.body.user == "admin" && req.body.pass == "pass"){
        return{body: "true"}
    }
    else{
        return{body: "false"}
    }
}