import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
admin.initializeApp();
//import * as serviceAccount from 'admin.json';
//admin.initializeApp(/*{ credential: admin.credential.cert(serviceAccount as any) }*/)

//import { isError } from 'util';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
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
*/

export const OnChatCreate = functions.firestore.document("Chats/{ChatID}").onCreate(
    async (snapshot, context) => {
        
        const snap = snapshot.data();

        if(snap) {
            const UserArray = snapshot.get("Users");
            /*let ChatRef = admin.firestore().collection("Chats").where("NumMessages", ">=", "0");
            UserArray.forEach((element: string) => {
                ChatRef = ChatRef.where("Users","array-contains",element);
            });
            ChatRef.get()
            .then(FoundChatSnapshot => {*/
                console.log("ChatReg Get Success")
                if (true/*FoundChatSnapshot.empty*/) {
                    snapshot.ref.update({NumMessages : 0}).then(A => {console.log("SnapShot Update Success")}).catch(A => {console.log("SnapShot Update Error")})
                    UserArray.forEach((element: string) => {
                        admin.firestore().collection("Users").doc(element).collection("Chats").add({ID : context.params.ChatID}).then(A => {console.log("User Update Success")}).catch(A => {console.log("User Update Error")});
                    });
                }
                else {
                    snapshot.ref.delete().then(A => {console.log("SnapShot Delete Success")}).catch(A => {console.log("SnapShot Delete Error")});
                }
            /*})
            .catch(Err => {
                console.log("ChatReg Get Error", Err);
            })*/

            return null;
        }
        else {
            return null;
        }
    }
)

export const OnMSGCreate = functions.firestore.document("Chats/{ChatID}/Messages/{MessageID}").onCreate(
    async (snapshot, context) => {
        
        const snap = snapshot.data();

        if(snap) {
            let ChatRef = admin.firestore().collection("Chats").doc(context.params.ChatID);
            ChatRef.get()
            .then(FoundChatSnapshot => {
                console.log("ChatReg Get Success");
                if (FoundChatSnapshot) {
                    const numM = FoundChatSnapshot.get("NumMessages") + 1;
                    admin.firestore().collection("Chats").doc(context.params.ChatID).update({NumMessages : numM}).then(A => {console.log("Msg Count Update Success")}).catch(A => {console.log("Msg Count Update Error")});
                    snapshot.ref.update({DateTime : new Date().valueOf()}).then(A => {console.log("Msg Count Update Success")}).catch(A => {console.log("Msg Count Update Error")});
                }
                else {
                    console.log("SnapShot Not Found");
                }
            })
            .catch(Err => {
                console.log("ChatReg Get Error", Err);
            })

            return null;
        }
        else {
            return null;
        }
    }
)
