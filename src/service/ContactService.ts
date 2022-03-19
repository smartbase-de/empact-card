import {db} from "../main";
import { collection, addDoc, doc, query, where, getDocs, getDoc  ,documentId } from "firebase/firestore"; 

const CARD_COLLECTION = "cards";
const CONTACT_COLLECTION = "contacts";
class ContactService {
  
  getAll = async(userEmail: string) => {
    const q = query(collection(db, CONTACT_COLLECTION),  where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const arr = [] as any;
    querySnapshot.forEach((doc) => {
      arr.push(doc.data().card);
    });
    if (arr.length == null || arr.length <= 0 ){
      return [];
    }
    const q1 = query(collection(db, CARD_COLLECTION),  where(documentId(), 'in', arr));
    const querySnapshot1 = await getDocs(q1);
    return querySnapshot1;
  }
    create = async(contact:any) => {

      const q = query(collection(db, CONTACT_COLLECTION), where("userEmail", "==", contact.userEmail), where("card", "==", contact.card));
      const querySnapshot = await getDocs(q);
      const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
          });
          if(arr.length>0){
            return ;
          }
      try {
       
        const doc = await addDoc(collection(db, CONTACT_COLLECTION), contact);
        console.log("Document written with ID: " + doc);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // getById = async (id:any) => {
    //   const docRef = doc(db, CARD_COLLECTION, id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     return docSnap.data();
    //   } else {
    //     // doc.data() will be undefined in this case
    //    return null;
    //   }
    // }
    // update(key, value) {
    //   return db.child(key).update(value);
    // }
    // delete(key) {
    //   return db.child(key).remove();
    // }
    // deleteAll() {
    //   return db.remove();
    // }
  }
  export default new ContactService();