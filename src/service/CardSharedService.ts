
import {auth} from "../main";
import CardService from './CardService';

class CardSharedService {
    cardDetail = {};

    setCardDetail(cardDetail:any){
        this.cardDetail = cardDetail;
    }
    getCardDetail= async () => {
        
        // console.log("hiiiiiiiiiiiiiiiiiiiiii");
        // console.log(JSON.stringify(this.cardDetail));
        if(Object.keys(this.cardDetail).length > 0){
            return this.cardDetail;
        }

        if (auth.currentUser && auth.currentUser.email) {
            const temp = await CardService.getAll(auth.currentUser.email);
            // console.log(JSON.stringify(temp));
           const tempcards = [] as any;
            temp.forEach((doc) => {
              const obj = doc.data();
              obj.id = doc.id;
              tempcards.push(obj);
            });
            if(tempcards.length >0){
              this.cardDetail = tempcards[0];
            }
            
          }
          return this.cardDetail;
       
    }


}
export default new CardSharedService();