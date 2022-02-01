import cookie from "cookie"
let accessCookie = "eyAiZXhwaXJ5IjogIjE6MzA6MDAgMjQvMTAvMjAxMiIsICJ1c2VySUQiOiAiRjY4RDRBNzdEQzM0IiB9.ScvlfpUDqgxtDPH4jsK44d+4cMNG+5yCvASJkVEI11o";
let user = "";
let role = "";
let location = "";

let head;

function getUser(username, password) {
    // TODO: Get user and pass from db and compare
    if(username == "admin" && password == "pass") {
        user = "Elaine";
        role = "admin";
        location = "/portal/administrator/view-plays"
    } else if (username == "eval" && password == "pass") {
        user = "Bob";
        role = "evaluator";
        location = "/portal/evaluator/main"
    } else {
        return false;
    }
    return true;
}

export const post = (req) => {
    if(getUser(req.body.user,req.body.pass)){
        if (role == "admin") {
            return{
                status: 200,
                headers: {
                    "Set-Cookie": [
                        `user=` + user + `; path=/; max-age=31536000`,
                        `role=` + role + `; path=/; max-age=31536000`,
                        `token=` + accessCookie + `; path=/; HttpOnly; max-age=31536000`
                    ],
                    redirect: location,
                },
                body: "true",
            }
        } else if (role == "evaluator") {
            return{
                status: 200,
                headers: {
                    "Set-Cookie": [
                        `user=` + user + `; path=/; max-age=31536000`,
                        `role=` + role + `; path=/; max-age=31536000`,
                        `token=` + accessCookie + `; path=/; HttpOnly; max-age=31536000`
                    ],
                    redirect: location,
                },
                body: "true",
            }
        }
        
    }
    else{
        return{
            headers: {
                "set-cookie": `token=; path=/; HttpOnly; max-age=31536000`,
                "set-cookie": `user=; path=/; HttpOnly; max-age=31536000`,
                "set-cookie": `role=; path=/; HttpOnly; max-age=31536000`,
              },
            body: "false",
        }
    }
}