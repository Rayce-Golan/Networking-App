import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
admin.initializeApp();

//import { isError } from 'util';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


export const OnUserCreate = functions.auth.user().onCreate(
    (user) => {
        const UserDocRef = "Users/" + user.uid;
        const UserDocCont = {
            email : user.email,
            verified : user.emailVerified,
            created : user.metadata.creationTime
        };

        console.log(UserDocRef);

        const UserDoc = admin.firestore().doc(UserDocRef);
        return UserDoc.set(UserDocCont);
    }
);