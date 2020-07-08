import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'


const config = {                                                                             // registering app in firebase
    // apiKey: "AIzaSyDDsEsYnnrUErs6JIp-hfk8AkMirpJlSYQ",
    // authDomain: "crown-clothing-80436.firebaseapp.com",
    // databaseURL: "https://crown-clothing-80436.firebaseio.com",
    // projectId: "crown-clothing-80436",
    // storageBucket: "crown-clothing-80436.appspot.com",
    // messagingSenderId: "157362915724",
    // appId: "1:157362915724:web:4f2905370cfafcf2512ea9",
    // measurementId: "G-Z09LKTJ8MM"


    apiKey: "AIzaSyBBwv9VmN3hKcSj_Xs3rWK4Q0N4th3Qjx0",
    authDomain: "mary-styling.firebaseapp.com",
    databaseURL: "https://mary-styling.firebaseio.com",
    projectId: "mary-styling",
    storageBucket: "mary-styling.appspot.com",
    messagingSenderId: "517056257829",
    appId: "1:517056257829:web:ab3b040f754dc5674684cc",
    measurementId: "G-FNGJFBRV8L"

}


firebase.initializeApp(config)                                                                // configure firebase

export const createUserProfileDocument= async (userAuth,additionalData)=>{                    // creating users document in DB using firestore
    if(!userAuth) return

    const userRef=firestore.doc(`users/${userAuth.uid}`)                          // assign a document reference to at which data should be stored in DB and create a data snapshot
    const snapShot=await userRef.get()                                                        // assign the document snapshot

    if(!snapShot.exists){                                                                     // on success, destruct the authenticated user properties which created in App.js using "auth.onAuthStateChanged". exists is a property of snapshot represents DB creation
        const {displayName,email}=userAuth
        const createdAt=new Date()

        try {                                                                                 // creating the user document in DB using set method
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(err) {
            console.log('Error creating user', err.message)
        }
    }

    return userRef
}


export const addCollectionAndDocuments=async (collectionKey,objectsToAdd) =>{                 // creating the SHOP_DATA collections and documents in DB using firestore
    const collectionRef=firestore.collection(collectionKey)                                   // create the collection reference
    const batch=firestore.batch()                                                             // batch method for multiple set since we have 5 documents in our obj

    objectsToAdd.forEach(obj=>{
        const newDocRef=collectionRef.doc()

        batch.set(newDocRef,obj)
    })

    return await batch.commit()
}


export const convetCollectionsSnapshotToMap = (collections)=>{                               // convert the collections snapshot Array "original structure" into an Array of Object which holds data we need

    const transformedCollection= collections.docs.map(doc => {                               // get a snapshot of docs
        const{title, items}=doc.data()                                                       // destructure to get only title & items

        return{                                                                              // shape of the object we get
            routeName:encodeURI(title.toLocaleString()),
            id:doc.id,
            title,
            items
        }
    })

    return transformedCollection                                                             // transform that shape to what we are going to store into the reducer key:{object properties} (e.x men:{object properties with its values})
        .reduce((accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()] = collection

        return accumulator
    },{})
}


export const getCurrentUser =()=>{                                                          //inistentiate a new promise that track the loggedin/out user through firebase method onAuthStateChanged on Auth object
    return new Promise((resolve, reject)=>{
        const subscribe =auth.onAuthStateChanged(userAuth=>{
            subscribe()
            resolve(userAuth)                                                               // get the signed in user
        },reject)                                                                           // reject user if he was not authenticated
    })
}


export const auth =firebase.auth()                                                           // create auth & firestore objects
export const firestore=firebase.firestore()


export const googleProvider=new firebase.auth.GoogleAuthProvider()                           //Congiguring Google authentication: use auth object to access Google authentication provider
googleProvider.setCustomParameters({prompt:'select_account'})                                //to allow select sign in from different gmail accounts
export const signInWithGoogle=()=>auth.signInWithPopup(googleProvider)                       //to allow showing a popup for selecting from different gmail accounts

export default firebase



/*
    Notes:
    if we have array of object [{},{},{}] and we need to set one of the objects properties like e.x title to be the key for all elements for each object
    like hats: {objects properties with its values}
    then the best choice for that case is the reduce method.
    return accumulator to let iteration over all title properties.
    initially we have put {} as an empty object.
*/
