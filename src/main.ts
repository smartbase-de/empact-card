import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
// import firebase from "firebase/app";
/* Theme variables */
import './theme/variables.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged  } from "firebase/auth"
import { getStorage } from 'firebase/storage';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import CardSharedService from './service/CardSharedService';

const firebaseConfig = {
  apiKey: "AIzaSyD72R11C66WtMfNsKm_qkUARp9ZQWwTjkU",
  authDomain: "smartbase-contacts.firebaseapp.com",
  projectId: "smartbase-contacts",
  storageBucket: "smartbase-contacts.appspot.com",
  messagingSenderId: "836606089179",
  appId: "1:836606089179:web:7666876d946a349b16f9fe",
  measurementId: "G-HHGJT8XGKC"
};

console.log("aaaaaaaaaaaaaaaaa");
// Initialize Firebase
let temps;
try{
  console.log("bbbbbbbbbbbbbb");
 temps = initializeApp(firebaseConfig);
 console.log("cccccccccccccccccc");
}catch(e){
  console.log("33333333333333 " + JSON.stringify(e));
}
//   const app = initializeApp(firebaseConfig);
// export const auth = firebase.auth();
console.log("ddddddddddddddddddddddd");
export const db = getFirestore(temps);
console.log("eeeeeeeeeeeeeeeeeeeee");
export const auth = getAuth(temps);
console.log("fffffffffffffffffffff");
export const storage = getStorage(temps);
console.log("gggggggggggggggggggggg");


// const app = createApp(App)
//   .use(IonicVue)
//   .use(router);
  
// router.isReady().then(() => {
//   app.mount('#app');
// });
  console.log("hhhhhhhhhhhhhhhhhhhhh");
 const eventBus = {
  on(event:any, callback:any) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event:any, data:any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event:any, callback:any) {
    document.removeEventListener(event, callback);
  },
};
console.log("iiiiiiiiiiiiiiiiiiiiii");


console.log("jjjjjjjjjjjjjjjjjjjj");
export default eventBus;
console.log("kkkkkkkkkkkkkkkkkkkkkk");
export const cardSharedService = CardSharedService;
console.log("llllllllllllllllllllllllll");
// let app: any;
// auth.onAuthStateChanged(async user => {
//   console.log("mmmmmmmmmmmmmmmmmmmm");
//   try{
//   if (!app) {
//     app = createApp(App)
//       .use(IonicVue)
//       .use(router);
//       console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
//     router.isReady().then(() => {
//       console.log("oooooooooooooooooooooooooo");
//       app.mount('#app');
//       console.log("ppppppppppppppppppp");
//     });
//     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqq");
//   }
//   console.log("rrrrrrrrrrrrrrrrrrrrrr");
// }catch(e){
//   console.log("111111" + JSON.stringify(e));
// }
// })

// onAuthStateChanged(auth, (user) => {
//   console.log("mmmmmmmmmmmmmmmmmmmm");
//   try{
//   if (!app) {
//         app = createApp(App)
//           .use(IonicVue)
//           .use(router);
//           console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
//         router.isReady().then(() => {
//           console.log("oooooooooooooooooooooooooo");
//           app.mount('#app');
//           console.log("ppppppppppppppppppp");
//         });
//         console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqq");
//       }
//     }catch(e){
//       console.log("111111" + JSON.stringify(e));
//     }

// });

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});

try{
  console.log("sssssssssssssssssssssssssssssssssss");
defineCustomElements(window);
console.log("tttttttttttttttttttttt");
}catch(e){
  console.log("2222222" + JSON.stringify(e));
}


