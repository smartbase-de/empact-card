<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :color="CommonUtil.getCssClass(auth.currentUser).headerBackground">
        <ion-title class="ion-text-center title">MY BUSINESS CARDS</ion-title>
        <ion-router-outlet></ion-router-outlet>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- <ion-header collapse="condense">
        <ion-toolbar color="primary">
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header> -->
      <ion-grid class="grid">
        <ion-row justify-content-end>
          <ion-col
            padding
            size-xs="6"
            size-sm="6"
            size-md="6"
            size-lg="6"
            align-self-stretch
            v-for="card in cards"
            :key="card.id"
          >
            <ion-card @click="openCard(card.id)">
              <ion-card-header>
                <ion-card-title>{{ card.name }}</ion-card-title>
                <ion-card-subtitle>{{ card.title }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="end" edge slot="fixed">
        <ion-fab-button :href="PAGE_PATHS.ADD_PAGE.path" color="secondary">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonRouterOutlet,
  IonLoading,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/vue";

import { addOutline } from "ionicons/icons";
import CardService from "../service/CardService";
import { auth } from "@/main";
import {PAGE_PATHS} from '../common/constant';
import CommonUtil from "../common/CommonUtil";

export default defineComponent({
  name: "Cards",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRouterOutlet,
    IonLoading,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonFab,
    IonFabButton,
  },
  setup() {
    return {
      addOutline,
      PAGE_PATHS,
      CommonUtil,
      auth
    };
  },
  data() {
    return {
      cards: [] as any,
      loading: false,
    };
  },
  methods: {
    getCards: async function () {
      if (auth.currentUser && auth.currentUser.email) {
        this.loading = true;
        var temp = await CardService.getAll(auth.currentUser.email);
        // console.log(JSON.stringify(temp));
        temp.forEach((doc) => {
          var obj = doc.data();
          obj.id = doc.id;
          this.cards.push(obj);
        });
        this.loading = false;
      }
    },
    openCard: function(cardId:string){
        this.$router.push(this.PAGE_PATHS.CARD_DETAIL.path + cardId);
    },
  },
  mounted() {
    this.getCards();
  },
});
</script>
<style scoped>
.title {
  font-family: "Rubrik";
}
.grid {
  margin-top: 40px;
}
ion-content {
    --background: url('/public/assets/bg-empact.png') 100% 100%; /* if supercare bg-supercare.png*/
}
</style>
