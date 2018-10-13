let admin = require('firebase-admin');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

function isAdmin (uid) {
    return db.collection('administradores').where('uid', '==', uid).where('valido', '==', true).get()
    .then(results => {
        return results.docs.length === 1;
    });
}

exports.verifyAdmin = functions.https.onCall((data, context) => {
    if (!context.auth) {
        return {status: 'error', code: 401, message: 'Not signed in'};
    }
    let uid = context.auth.uid;
    return isAdmin(uid).then( admin => {
        return {status: 'ok', code: 200, isAdmin: admin};
    })
    .catch(_ => {
        return {status: 'error', code: 500, message: 'Unknown'};
    });
});



