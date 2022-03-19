import {db} from "../main";
import { collection, addDoc, doc, query, where, getDocs, getDoc ,updateDoc  } from "firebase/firestore"; 

const CARD_COLLECTION = "cards";
class CardService {
  
    getAll = async(userEmail: string) => {
      const q = query(collection(db, CARD_COLLECTION), where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    }
    create = async(card:any) => {
      // const collectionRef = doc(db, 'contacts');
      // console.log(JSON.stringify(collectionRef));
      try {
        let doc1 = {} as any;
         doc1 = await addDoc(collection(db, CARD_COLLECTION), card);
        console.log("Document written with ID: " + JSON.stringify(doc1['_key']['path']['segments'][1]));
        return doc1['_key']['path']['segments'][1];
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    getById = async (id:any) => {
      const docRef = doc(db, CARD_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = docSnap.data();
        obj.id = docSnap.id;
        return obj;
      } else {
        // doc.data() will be undefined in this case
       return null;
      }
    }
    update = async (obj:any , id:any)  =>{
      const docRef = doc(db, CARD_COLLECTION, id);
      await updateDoc(docRef, obj);
    }
    // delete(key) {
    //   return db.child(key).remove();
    // }
    // deleteAll() {
    //   return db.remove();
    // }
  }
  export default new CardService();