import * as cookie from 'cookie';

const publicPages = [
    '/', 
    '/api/login', 
    '/apply', 
    '/login', 
    '/server/submission/file.json', 
    '/server/submission/form.json'
];
const evaluatorPages = [
    '/', 
    '/api/login', 
    '/api/logout', 
    '/server/submission/file', 
    '/server/submission/form.json', 
    '/portal/error', 
    '/apply', 
    '/login', 
    '/evaluator/assigned-plays', 
    '/evaluator/main', 
    '/evaluator/evaluation'
];

function verifyToken(token) {
	if (token == 'eyAiZXhwaXJ5IjogIjE6MzA6MDAgMjQvMTAvMjAxMiIsICJ1c2VySUQiOiAiRjY4RDRBNzdEQzM0IiB9.ScvlfpUDqgxtDPH4jsK44d+4cMNG+5yCvASJkVEI11o') {
		return true
	}
	return false

}

export async function handle({ request, resolve }) {
	const token = cookie.parse(request.headers.cookie || '');
	if (token) {
		request.locals.isLoggedIn = verifyToken(token.token);
	} else {
		request.locals.isLoggedIn = false;
	};
	const response = await resolve(request);
    console.log(request.path);
	if(!request.locals.isLoggedIn && !publicPages.includes(request.path)) {
        console.log("redir"+request.path);
		return {
        status: 302,
        headers: {
            location: "/login",
        },
        body: {
            message: "redirecting",
        }
		};
	} else if (request.locals.isLoggedIn && !evaluatorPages.includes(request.path) && token.user == "evaluator") {
        return {
            status: 302,
            headers: {
                location: "/portal/error",
            },
            body: {
                message: "redirecting",
            }
        };
    }
	return {
		...response
	};
}

export function getSession(request) {
	const { isLoggedIn } = request.locals;
	console.log(isLoggedIn)
	return {
		isLoggedIn
	};
}