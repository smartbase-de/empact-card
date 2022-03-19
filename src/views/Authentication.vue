<template>
  <ion-page>
   
    <ion-content :fullscreen="true">
      <ion-card class="bg">
        <div class="center">
        <span class="empact">
            <img src="/assets/icon/logo-ecard.png" alt="Empact" />
          </span>
          <!--<span class="supercare">
            <img src="/assets/icon/logo-supercare.png" alt="Supercare"/> 
          </span>-->
        </div>

        <ion-card-content class="bg">
          <form
            @submit.prevent="
              mode === AuthMode.SignIn
                ? signInWithEmailAndPasswordCust(email, password)
                : signUpWithEmailAndPassword(name, email, password, confirmpPassword)
            "
          >
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating">Name</ion-label>
              <ion-input v-model="name"  @keyup.enter="signUpWithEmailAndPassword(name, email, password, confirmpPassword)"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"  @keyup.enter="
               mode === AuthMode.SignIn
                ? signInWithEmailAndPasswordCust(email, password)
                : signUpWithEmailAndPassword(name, email, password, confirmpPassword)"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" type="password" @keyup.enter="
               mode === AuthMode.SignIn
                ? signInWithEmailAndPasswordCust(email, password)
                : signUpWithEmailAndPassword(name, email, password, confirmpPassword)"></ion-input>
            </ion-item>
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating" >Confirm Password</ion-label>
              <ion-input v-model="confirmpPassword" type="password"  @keyup.enter="signUpWithEmailAndPassword(name, email, password, confirmpPassword)"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ mode === AuthMode.SignIn ? "Sign In" : "Sign Up" }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="ion-margin-top"
              @click="
                mode =
                  mode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn
              "
            >
              {{ mode === AuthMode.SignIn ? "Sign Up" : "Cancel" }}
            </ion-button>
          </form>
        </ion-card-content>
        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-loading :is-open="loading" message="Please wait..."> </ion-loading>
  </ion-page>
</template>
<script lang="ts">
import {
  IonPage,
  //IonHeader,
  //IonToolbar,
  //IonTitle,
  IonContent,
  IonCard,
  //  IonCardSubtitle,
  //  IonCardTitle,
  //  IonCardHeader,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonLoading,
} from "@ionic/vue";

import { auth, db } from "../main";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
enum AuthMode {
  SignIn,
  SignUp,
}
export default {
  name: "Authentication dsf",
  components: {
    //IonHeader,
    //IonToolbar,
    //IonTitle,
    IonContent,
    IonPage,
    IonCard,
    //   IonCardSubtitle,
    //   IonCardTitle,
    //   IonCardHeader,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonLoading
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "",
      email: "",
      password: "",
      mode: AuthMode.SignIn,
      errorMsg: "",
      confirmpPassword: "",
      loading: false,
    });

    const signInWithEmailAndPasswordCust = async (
      email: string,
      password: string
    ) => {
      try {
        if (!email || !password) {
          state.errorMsg = "Email and Password Required";
          return;
        }
        state.loading = true;
        await signInWithEmailAndPassword(auth, email, password);
        state.loading = false;
        router.push("/tabs/contacts");
      } catch (error: any) {
        state.loading = false;
        state.errorMsg = error.message;
      }
    };
    const signUpWithEmailAndPassword = async (
      name: string,
      email: string,
      password: string,
      confirmpPassword: string
    ) => {
      
      try {
        if (!name || !email || !password || !confirmpPassword) {
          state.errorMsg = "Name, Email, Password, Confirm Password Required";
          return;
        }
        if(password != confirmpPassword){
             state.errorMsg = "Password and Confrim Password does not match";
           return;
        }
        state.loading = true;
        const authRes = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // db.collection("users").doc(authRes.user?.uid).set({
        // name,
        // email,
        // });
         state.loading = false;
         state.mode = AuthMode.SignIn;
        // router.push("/");
      } catch (error: any) {
         state.loading = false;
        state.errorMsg = error.message;
      }
    };
    // const loadMasterUser = async ()=>{
    //   USER_NAME.forEach(async (doc) => {
    //       await createUserWithEmailAndPassword(
    //       auth,
    //       doc.email,
    //       doc.Password
    //     );
    //   });
    // };
    return {
      ...toRefs(state),
      signInWithEmailAndPasswordCust,
      signUpWithEmailAndPassword,
      // loadMasterUser,
      AuthMode,
    };
  },
};
</script>
<style>
.center {
  display: flex;
  height: 20vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
.empact {
  min-height: 65px;
}

.empact img {
  margin-top: 10px;
}

.supercare img {
  max-width: 130px;
  margin-left: 28px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.list {
  margin-bottom: 0;
}
ion-content {
    --background: url('/public/assets/bg-empact.png') 100% 100%; /* if supercare bg-supercare.png*/
}
.title {
  font-family: "Rubrik";
}
.bg {
  background-color: white;
}
</style>
