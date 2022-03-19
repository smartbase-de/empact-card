 <!--<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title class="ion-text-center title">SHARE CARD</ion-title>
      <ion-buttons  slot="start">
        <ion-button  @click="cancelFunction()" >Back</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="custom-qr-code">
      <canvas id="custom-qr-code"></canvas>
    </div>
  </ion-content>
</template> -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="CommonUtil.getCssClass(cardDetail).headerBackground">
        <ion-buttons slot="start">
        <ion-back-button ></ion-back-button>
      </ion-buttons>
        <ion-title class="ion-text-center title">SHARE CARD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :class="CommonUtil.getCssClass(cardDetail).contentBackgroundClass">
      <div class="custom-qr-code">
        <canvas id="custom-qr-code"></canvas>
      
      </div>
      <!-- <ion-button shape="round" class="custom-send-button"> 
         <ion-icon slot="icon-only" :icon="sendOutline" class="sendIcon"></ion-icon> 
        Send
      </ion-button>  -->
 
    
    </ion-content>
    
  </ion-page>
</template>

<script>
import {
   IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { APP_URL } from "../common/constant";
import CommonUtil from "../common/CommonUtil";
import { auth, cardSharedService } from "../main";


const QRCode = require("qrcode");

export default defineComponent({
  name: "Modal",
  components: {
     IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
     IonBackButton,
  },
  props: {
    cardObj: { type: Object },
    cancelFunction: {
      type: Function,
    },
  },
   setup() {
    return {
      CommonUtil,
      auth
    };
  },
  data() {
    return {
      content: "Content",
       cardDetail: {},
    };
  },
  methods: {
    generateQrCode() {
     const id = this.$route.params.id;
      const temp = APP_URL + "tabs/scannedCard/" + id;
      QRCode.toCanvas(
        document.getElementById("custom-qr-code"),
        temp,
        function (error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    },
  },
  // mounted() {
  //   this.generateQrCode();
  //     cardSharedService.getCardDetail().then((obj)=>{
  //      this.cardDetail = obj;
  //    });
  // },
   ionViewWillEnter() {
      this.generateQrCode();
       cardSharedService.getCardDetail().then((obj)=>{
       this.cardDetail = obj;
     });
   }
});
</script>
<style>
.custom-qr-code {
  text-align: center;
}
</style>
