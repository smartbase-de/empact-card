<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="CommonUtil.getCssClass(cardDetail).headerBackground">
        <ion-buttons slot="start">
          <!-- <ion-back-button >Back</ion-back-button>-->
        </ion-buttons>
        <ion-title class="ion-text-center title">HELP</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :class="CommonUtil.getCssClass(cardDetail).contentBackgroundClass">
      <ion-list>
        <ion-item>
          STEP 1. Tap CARD in the bottom navigation to view your own digital business
          card.
        </ion-item>
        <ion-item>
          STEP 2. Share your card by first opening your card, then tapping the purple share button top right.
        </ion-item>
        <ion-item>
          STEP 3. Scan a colleague's card by tapping the SCAN button in the bottom
          navigation. Allow access to your camera and then point the camera at
          your colleagues digital QR code. Their business card will be
          immediately saved to your contacts list which you can access by
          tapping the CONTACTS button in the bottom navigation.
        </ion-item>
        <ion-item>
          STEP 4. You can edit your business card by opening your card and tapping the
          edit button top left. 
        </ion-item>
        <ion-item>
          STEP 5. You can add a selfie to your business card by editing your card and
          tapping the camera icon in the selfie field. 
          And you can check the Whatsapp box to allow colleagues to contact you there.
        </ion-item>
        <ion-item>
          STEP 6. You can also share a colleague's card with others by opening it from
          contacts and tapping the share button.
        </ion-item>
        <ion-item>
          STEP 7. Tap on a contact's mobile number, work number or email address to copy when in a business card.
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonButtons
} from "@ionic/vue";
import { defineComponent } from "vue";
import { auth,cardSharedService } from "@/main";
import {PAGE_PATHS} from '../common/constant';
import CommonUtil from "../common/CommonUtil";

export default defineComponent({
  name: "Contacts",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonButtons
  },
   setup() {
    return {
      CommonUtil,
      auth
    };
  },
  data() {
    return {
      cardDetail:{},
    };
  },
   ionViewWillEnter() {
      cardSharedService.getCardDetail().then((obj)=>{
       this.cardDetail = obj;
     });
  },

});
</script>
