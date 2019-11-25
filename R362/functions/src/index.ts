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
        const UserDocRef = "Users/" + user.email;
        const UserDocCont = {
            Email : user.email,
            IDNumber : user.uid,
            Verified : user.emailVerified,
            Created : user.metadata.creationTime
        };

        console.log(UserDocRef);

        const UserDoc = admin.firestore().doc(UserDocRef);
        return UserDoc.set(UserDocCont);
    }
);

export const OnUserPost = functions.firestore.document("Form Root/{RootID}/{RootID_MastColl}/{SubTagID}/{SunTagColl}/{ChatGroup}/{ChatRoom}/{POSTID}").onCreate(
    async (snapshot, context) => {
        
        const snap = snapshot.data();

        if(snap) {
            const UserPostRef = "Users/" + context.params.POSTID + "/Posts/" 
            const UserPostCont = {
                Form_Root : context.params.RootID,
                RootID_MastColl : context.params.RootID_MastColl,
                SubTagID : context.params.SubTagID,
                SunTagColl : context.params.SunTagColl,
                ChatGroup : context.params.ChatGroup,
                ChatRoom : context.params.ChatRoom,
                POSTID : context.params.POSTID
            };

            const UserPostsCollection = admin.firestore().collection(UserPostRef);
            return UserPostsCollection.add(UserPostCont);
        }
        else {
            return null;
        }
    }
)