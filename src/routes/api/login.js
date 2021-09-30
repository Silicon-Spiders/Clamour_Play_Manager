export const post = (req) => {
    console.log("req.body", req.body);

    if(req.body.user == "admin" && req.body.pass == "pass"){
        return{
            body: "true"
        }
    }
    else{
        return{
            body: "false",
        }
    }
}