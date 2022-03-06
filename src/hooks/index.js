import * as cookie from 'cookie';

const publicPages = [
    '/',
    '/api/login',
    '/apply',
    '/login',
    '/server/submission/file.json',
    '/server/submission/form.json',
    '/server/submission/file',
    '/server/submission/form'
];

const playroute = "/server/plays"

const evaluatorPages = [
    '/',
    '/api/login',
    '/api/logout',
    '/server/submission/file',
    '/server/submission/form.json',
    '/server/evaluator/playsAssigned.json',
    '/server/evaluator/evaluations.json',
    '/server/evaluator/getPlayAssignedByID.json',
    '/server/evaluator/updatePlayAssigned.json',
    '/server/evaluator/getFinishedPlays.json',
    '/portal/error',
    '/apply',
    '/login',
    '/portal/evaluator/assigned-plays',
    '/portal/evaluator/main',
    '/portal/evaluator/evaluation',
    '/portal/evaluator/assigned-plays-new',
    '/portal/evaluator/view-past-plays'

];

function verifyToken(token) {
    if (token == 'eyAiZXhwaXJ5IjogIjE6MzA6MDAgMjQvMTAvMjAxMiIsICJ1c2VySUQiOiAiRjY4RDRBNzdEQzM0IiB9.ScvlfpUDqgxtDPH4jsK44d+4cMNG+5yCvASJkVEI11o') {
        return true
    }
    return false

}

export async function handle({ event, resolve }) {
    const token = cookie.parse(event.request.headers.get("cookie") || '');
    let isLoggedIn = verifyToken(token.token)
    if (!isLoggedIn && !publicPages.includes(event.url.pathname)) {
        // console.log("redir: "+event.url.pathname);
        return Response.redirect(new URL("/login", event.request.url));
    } else if (isLoggedIn && (!evaluatorPages.includes(event.url.pathname) && !event.url.pathname.includes(playroute)) && token.role == "evaluator" ) {
        return Response.redirect(new URL("/portal/error", event.request.url));
    }
    const response = await resolve(event);
    return response;
}

