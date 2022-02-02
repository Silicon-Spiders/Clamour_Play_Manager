import { getEvaluatorId, getAdmin } from "$lib/dbFunctions";

let accessCookie = "eyAiZXhwaXJ5IjogIjE6MzA6MDAgMjQvMTAvMjAxMiIsICJ1c2VySUQiOiAiRjY4RDRBNzdEQzM0IiB9.ScvlfpUDqgxtDPH4jsK44d+4cMNG+5yCvASJkVEI11o";
let user = "";
let role = "";
let userId = "";
let location = "";

async function getUser(username, password) {
    // TODO: Get user and pass from db and compare
    let data = await getAdmin(username, password);
    // console.log(data);
    if (data != null) {
        user = data.username;
        userId = data._id;
        role = "admin";
    } else {
        data = await getEvaluatorId(username, password);
        if (data != null) {
            user = data.username;
            userId = data._id;
            role = "evaluator";
        }
    }

    if(username == user && password == data.password && role == "admin") {
        location = "/portal/administrator/view-plays";
    } else if (username == user && password == data.password && role == "evaluator") {
        user = "Bob";
        role = "evaluator";
        location = "/portal/evaluator/main";
    } else {
        return false;
    }
    return true;
}

export const post = async (req) => {
    if(await getUser(req.body.user,req.body.pass)){
        if (role == "admin") {
            return{
                status: 200,
                headers: {
                    "Set-Cookie": [
                        `user=` + user + `; path=/; max-age=31536000`,
                        `role=` + role + `; path=/; max-age=31536000`,
                        `userid=` + userId + `; path=/; HttpOnly; max-age=31536000`,
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
                        `userid=` + userId + `; path=/; HttpOnly; max-age=31536000`,
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
            status: 401,
            headers: {
                "set-cookie": `token=; path=/; HttpOnly; max-age=31536000`,
                "set-cookie": `user=; path=/; HttpOnly; max-age=31536000`,
                "set-cookie": `userid=; path=/; HttpOnly; max-age=31536000`,
                "set-cookie": `role=; path=/; HttpOnly; max-age=31536000`,
              },
            body: "false",
        }
    }
}