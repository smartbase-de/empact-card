<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="CommonUtil.getCssClass(cardDetail).headerBackground">
        <ion-buttons slot="start">
        <!--<ion-back-button >Back</ion-back-button>-->
      </ion-buttons>
        <ion-title class="ion-text-center title">CARD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :class="CommonUtil.getCssClass(cardDetail).contentBackgroundClass">
     
        <CardComponent :card="card"></CardComponent>
      
     
      <!-- <ion-button shape="round" class="custom-send-button"> 
         <ion-icon slot="icon-only" :icon="sendOutline" class="sendIcon"></ion-icon> 
        Send
      </ion-button>  -->
      <ion-fab vertical="top" horizontal="end" edge slot="fixed">
        <ion-fab-button @click="openSendModal()" color="secondary">
          <ion-icon :icon="sendOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!-- <ion-modal
        :is-open="openSendModel"
        :swipe-to-close="true"
        :presenting-element="$parent.$refs.ionRouterOutlet"
        @didDismiss="hideSendModal(false)"
      >
        <Modal :cancelFunction="hideSendModal" :cardObj="card"></Modal> 
      </ion-modal> -->
    </ion-content>
    <ion-loading :is-open="loading" message="Please wait..."> </ion-loading>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  //IonModal,
  IonIcon,
  IonButtons,
  IonFab,
  IonFabButton,
  //IonBackButton
} from "@ionic/vue";
import CardService from "../service/CardService";
import { sendOutline } from "ionicons/icons";
// import Modal from "./SendModal.vue";
import CardComponent from "../components/CardComponent.vue";
import {PAGE_PATHS} from '../common/constant';
import CommonUtil from "../common/CommonUtil";
import { auth, cardSharedService } from "../main";

export default defineComponent({
  name: "Card",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLoading,
    // IonModal,
    // Modal,
    IonIcon,
    IonButtons,
    IonFab,
    IonFabButton,
    //IonBackButton,
    CardComponent
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
      card: {} as any,
      loading: false,
      openSendModel: false,
       cardDetail: {},
    };
  },
  methods: {
    getCardDetail: async function () {
      const id = this.$route.params.id;
      if (id) {
        this.loading = true;
        let obj = await CardService.getById(id);
        if(obj){
          obj.id = id;
        }
        this.card = obj;
        this.loading = false;
      }
    },
    openSendModal() {
     this.$router.push(PAGE_PATHS.SHARE_CARD.path + this.$route.params.id);
    },
    hideSendModal() {
      this.openSendModel = false;
    },
  },
  // mounted() {
  //   // this.getCardDetail();
  //   // console.log("contacts11111111111: " + JSON.stringify(cardSharedService.getCardDetail()));
  // },
   ionViewWillEnter() {
     this.getCardDetail();
     cardSharedService.getCardDetail().then((obj:any)=>{
       this.cardDetail = obj;
     });
  },
});
</script>

