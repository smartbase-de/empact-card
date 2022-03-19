<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="CommonUtil.getCssClass(cardDetail).headerBackground">
        <ion-buttons slot="start">
         <!-- <ion-back-button>Back</ion-back-button>-->
        </ion-buttons>
        <ion-title class="ion-text-center title">SCANNED CARD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :class="CommonUtil.getCssClass(cardDetail).contentBackgroundClass">
      <CardComponent :card="card"></CardComponent>
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
  IonButtons
} from "@ionic/vue";
import CardService from "../service/CardService";
import ContactService from "../service/ContactService";
import { sendOutline } from "ionicons/icons";
import { auth, cardSharedService } from "../main";
import CardComponent from "../components/CardComponent.vue";
import CommonUtil from "../common/CommonUtil";

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
    CardComponent,
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
      console.log(this.$route.params.id);
      const id = this.$route.params.id;
      if (id) {
        this.loading = true;
        const obj = await CardService.getById(id);
        this.card = obj;
        this.loading = false;
      }
    },
    addToMyContact: async function () {
      if (auth.currentUser && auth.currentUser.email) {
        const obj = {
          card: this.$route.params.id,
          userEmail: auth.currentUser.email,
        };
        ContactService.create(obj);
      }
    },
    openSendModal() {
      this.openSendModel = true;
    },
    hideSendModal() {
      this.openSendModel = false;
    },
  },
  // mounted() {
  //   this.getCardDetail();
  //   this.addToMyContact();
  // },
   ionViewWillEnter() {
    this.getCardDetail();
    this.addToMyContact();
      cardSharedService.getCardDetail().then((obj)=>{
       this.cardDetail = obj;
     });
  },
  
});
</script>
