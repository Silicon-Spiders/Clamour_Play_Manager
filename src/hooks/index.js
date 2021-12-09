// import * as cookie from "cookie";

// const publicPages = ['/', '/api', '/apply', '/login'];

// function verifyToken(token) {
// 	if (token == 'tempToken') {
// 		return true
// 	}
// 	return false

// }

// export async function handle({ request, resolve }) {
// 	const token = cookie.parse(request.headers.cookie || '');
// 	if (token) {
// 		request.locals.isLoggedIn = verifyToken(token.token);
// 	} else {
// 		request.locals.isLoggedIn = false;
// 	};
// 	const response = await resolve(request);
// 	if(!request.locals.isLoggedIn && !publicPages.includes(request.path)) {
// 		return {
//             // status: 301,
//             // location: "/portal/administrator/view-plays",
// 			// body: {
// 			// 	message: "redirecting",
// 			// }
// 		};
// 	}
// 	return {
// 		...response
// 	};
// }

// export function getSession(request) {
// 	const { isLoggedIn } = request.locals;
// 	console.log(isLoggedIn)
// 	return {
// 		isLoggedIn
// 	};
// }