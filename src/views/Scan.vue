<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="CommonUtil.getCssClass(cardDetail).headerBackground">
        <ion-buttons slot="start">
          <ion-back-button>Back</ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center title">SCAN QR CODE</ion-title>
      </ion-toolbar>
    </ion-header> 
     <ion-content :fullscreen="true" :class="CommonUtil.getCssClass(cardDetail).contentBackgroundClass"> 
      <div class="custom-scanner" v-if="startScan">
      <qrcode-stream @decode="onDecode" @init="onInit" />  
      </div> 

      <!--<ion-fab
        vertical="bottom"
        horizontal="end"
        edge
        slot="fixed"
        class="custom-scan-icon"
      >
        <ion-button
          shape="round"
          class="custom-send-button"
          @click="scanQrCode()"
        >
          Scan
        </ion-button>
      </ion-fab>-->
     </ion-content> 
     <ion-loading :is-open="loading" message="Please wait..."> </ion-loading> 
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
   IonContent,
  IonLoading,
  IonButtons,
  IonBackButton,
  // IonFab,
  // IonButton,
} from "@ionic/vue";

import { isPlatform, getPlatforms } from '@ionic/vue';

import { sendOutline } from "ionicons/icons";
import { QrcodeStream } from "vue3-qrcode-reader";
import { APP_URL } from "../common/constant";
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import CommonUtil from "../common/CommonUtil";
import { auth,cardSharedService } from "../main";


export default defineComponent({
  name: "Tab2Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLoading,
    IonButtons,
    IonBackButton,
    // IonFab,
    // IonButton,
   QrcodeStream,
  },
  setup() {
    return {
      sendOutline,
      CommonUtil,
      auth
    };
  },
  data() {
    return {
      card: {},
      loading: false,
      openSendModel: false,
      scanResult: null,
      startScan: false,
      cardDetail: {},
    };
  },
  methods: {
    onDecode(result) {
      this.scanResult = result;
      this.startScan = false;
      result = result.replace(APP_URL, "");
      this.$router.push("/" + result);
      console.log(result);
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
     prepare: async function () {
       await BarcodeScanner.prepare();
    },

    scanQrCode : async function() {
     
     
      if(isPlatform('core') || isPlatform('mobileweb') || isPlatform('desktop')) 
      {
       this.startScan = true;
      }
      else{
           await this.didUserGrantPermission();
            await this.prepare();
            document.body.style.opacity="0.2";
            document.body.style.background = "transparent";
            await BarcodeScanner.hideBackground(); // make background of WebView transparent
        
        try{
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // start scanning and wait for a result
        // if the result has content
        if (result.hasContent) {
           document.body.style.background = "";
          document.body.style.opacity="1";
          var tempResult = result.content;
           tempResult = tempResult.replace(APP_URL, "");
           this.$router.push("/" + tempResult);
        }
      }catch(e){
        document.body.style.background = "";
        document.body.style.opacity="1";
        console.log("eeeeeeeeeee" + JSON.stringify(e));
      }
      }
    },
     didUserGrantPermission : async () => {
  // check if user already granted permission
  const status = await BarcodeScanner.checkPermission({ force: true });

          if (status.granted) {
            // user granted permission
            console.log("permission granted");
          }

          if (status.denied) {
            // user denied permission
            console.log("permission denied");
          }

          if (status.asked) {
            // system requested the user for permission during this call
            // only possible when force set to true
          }

          if (status.neverAsked && !status.granted) {
            // user has not been requested this permission before
            // it is advised to show the user some sort of prompt
            // this way you will not waste your only chance to ask for the permission
            const c = confirm(
              'We need your permission to use your camera to be able to scan barcodes',
            );
            if (!c) {
            console.log("permission neverAsked");
            }
          }

          if (status.restricted || status.unknown) {
            // ios only
            // probably means the permission has been denied
            console.log("permission restricted or unknown");
          }
            console.log("permission status" + JSON.stringify(status));

     },
     
      stopScan : function () {
      if(isPlatform('core') || isPlatform('mobileweb') || isPlatform('desktop')) 
      {
           this.startScan = false;
      }else{
        document.body.style.background = "";
        document.body.style.opacity="1";
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
      }
      },
  },
  // user has not denied permission
  // but the user also has not yet granted the permission
  // so request it



  // mounted() {
  //   //    this.getCardDetail();
  //   this.scanQrCode();
  // },
    ionViewWillEnter() {
       this.scanQrCode();
      cardSharedService.getCardDetail().then((obj)=>{
       this.cardDetail = obj;
     });
  },
  ionViewWillLeave(){
   this.stopScan();
  }
});
</script>
<style>
.custom-scan-icon {
  margin-bottom: 30px;
}
.custom-scanner {
  width: 50%;
  margin: auto;
  margin-top: 18px;
}
ion-content {
    --background: url('/public/assets/bg-empact.png') 100% 100%; /* if supercare bg-supercare.png*/
}
</style>
