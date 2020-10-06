//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const purchaseMail = functions.https.onCall(async (data, context) => {
    if(!context.auth && !context.auth.token.email) {
        throw new functions.https.HttpsError('failed-precondition', 'Must be logged in with an email address')
    }

    const msg = {
        to: context.auth.token.email,
        from: 'assetbay.dev'
    }

    //send mail here

    return { success: true }

})