
import {auth,doc,onAuthStateChanged,signOut} from "../firebase.js"
let name = document.getElementById("name")
let main = document.getElementById("main")
let loader = document.getElementById("loader")
onAuthStateChanged(auth, (user) => {
  if(!user){
    location.replace("../index.html")
  } 
   else if (user) {
        main.style.display ="block"
        loader.style.display ="none"
        const uid = user.uid;
        console.log("userid",user.uid)
        name.innerHTML = user.email.slice(0,user.email.indexOf("@"))
        // name.innerHTML = user.email.slice(0,user.emial.indexOf("@"))

    } 
})
// console.log(username)
let signoutbtn  = document.getElementById("signoutbtn");
function signout(){
// const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  location.replace("../signin/login.html")
}).catch((error) => {
  // An error happened.
  console.log(error)
});
}
signoutbtn.addEventListener('click',signout)


// let todoAdd = document.getElementById("todoAdd")
// let todoFunc =() =>{
//   let input = document.getElementById("input")
//   console.log(input.value)

// }
// todoAdd.addEventListener('click',todoFunc);

// new code 

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword,sendEmailVerification,
        signInWithPopup, GoogleAuthProvider
      } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore,setDoc , addDoc,collection , updateDoc ,deleteDoc ,deleteField  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// import {addDoc,setDoc,doc,docRef,collection,db,getFirestore,auth} from "./firebase.js"
const firebaseConfig = {
        apiKey: "AIzaSyCLcTooIOuWhV3zVoicJlm82bX711BmqE8",
        authDomain: "new-login-project-b5de9.firebaseapp.com",
        projectId: "new-login-project-b5de9",
        storageBucket: "new-login-project-b5de9.appspot.com",
        messagingSenderId: "440992145032",
        appId: "1:440992145032:web:e49b4812c8996e994b493d"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app)
      // const auth = getAuth(app)

let todoAdd = document.getElementById("todoAdd")
let DeleteAllbtn = document.getElementById("DeleteAllbtn")

let addTodo =async ()=>{   

        let todoInput = document.getElementById("input")
        console.log(todoInput.value)

        // firebase
     
    // You can perform additional actions with the document ID here
    const docRef = await addDoc(collection(db, "todos"), {
            todo: todoInput.value,
        });
        console.log("Document written with ID: ", docRef.id);  
        // const collectionRef = db.collection('todos');
        
        // collectionRef.get().then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //                 console.log(doc.id);      
        //         });
        // }).catch((error) => {
        //         console.error("Error getting documents: ", error);
        // });
        // todoAdd.addEventListener('click',addTodo,(e)=>{
        // e.preventDefault()
        // if input empty 
        if(input.value !==""){

        let liElem = document.createElement("li");
        var liText = document.createTextNode(todoInput.value)
        // console.log(liText)
        // })
        liElem.appendChild(liText)
        console.log(liElem)
        
        let list = document.getElementById("list")
        list.appendChild(liElem)
        input.value =""
        // list.appendChild(liElem)

// delete btn

// Delete button creation
let delbtn = document.createElement("button");
let deltext = document.createTextNode("Delete");
let itemId ="deleteBtn"; // Replace 123 with the actual id you want to pass

// Set the id attribute of the button
delbtn.setAttribute("id", "deleteBtn_" + itemId);

// Append text node and button to li element
delbtn.appendChild(deltext);
liElem.appendChild(delbtn);

// Delete button functionality
let delItem = async(event) => {
        
    let clickedButton = event.target;
    await deleteDoc(doc(db, "todos", "todo"));
    let itemId = clickedButton.id.split("_")[1]; // Extract the item id from the button's id
    let listItem = clickedButton.parentNode;
    
    console.log(listItem);
    alert("Are you sure you want to delete this todo with id: " + itemId);
    listItem.remove();
}

// Add event listener to the delete button
delbtn.addEventListener('click', delItem);

        // //delete btn
        // let delbtn = document.createElement("button")
        // let deltext = document.createTextNode("Delete")
        // // delbtn.setAttribute("id","delete_btn"+ delItem");
        // delbtn.appendChild(deltext)
        // liElem.appendChild(delbtn)

        // // edit btn
        // let editBtn = document.createElement("button")
        // let editText = document.createTextNode("Edit")
        // editBtn.appendChild(editText)
        // liElem.appendChild(editBtn)
        // editBtn.setAttribute("id","editItem(this)")
        // input.value ="";

        // new code using id edit btn
        
        // Edit button creation
let editBtn = document.createElement("button");
let editText = document.createTextNode("Edit");
editBtn.appendChild(editText);
liElem.appendChild(editBtn);


// Set the id attribute of the button
editBtn.setAttribute("id", "editBtn_" + itemId); // Assuming you have an itemId variable

// Edit button functionality
let editItem = async(event) => {
    let clickedButton = event.target;
    let listItem = clickedButton.parentNode;

    console.log(listItem);
    const updated = doc(db, "todos", docRef);

    // Set the "capital" field of the city 'DC'
    await updateDoc(updated, {
        todo: true
    });
    let editValue = prompt("Enter your updated Value", listItem.firstChild.nodeValue);

    if (editValue !== null) { // Check if the user clicked cancel
        listItem.firstChild.nodeValue = editValue;
    }
};

// Add event listener to the edit button
editBtn.addEventListener('click', editItem);



}
else{
        alert("please enter valid todo")
}

}
todoAdd.addEventListener('click',addTodo)

// delete All functionality
let deleteAll = async(D) =>{
let list = document.getElementById("list")
await updateDoc(docRef, {
        todos: deleteField()
    });
if(deleteAll){
        alert("Are you sure you want to delete all todo")
        list.innerHTML=""

}else{
        // list.appendChild(liElem)

}
}
DeleteAllbtn.addEventListener('click',deleteAll)
// // delete btn functionality

// let delItem = (D) =>{
//         console.log(D.parentNode)
//         alert("Are you sure you want to delete this todo")
//         D.parentNode.remove()
// }
// let delValue = document.getElementById("delItem")
// delValue.addEventListener('click' ,delItem )
// edit btn functionality

// let editItem = (E)=>{
//         console.log(E.parentNode)
//         console.log(input.value)
//         let editValue =prompt("Enter your updated Value",input.value)
//         console.log(editValue)
//         E.parentNode.firstChild.nodeValue= editValue

// }




