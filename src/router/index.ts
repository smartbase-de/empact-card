import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
// import AddCardPage from '../views/AddCardPage.vue';
import {auth, db} from '../main';


const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    // console.log(JSON.stringify(auth.currentUser));
    if (auth.currentUser) {
      next()
    } else {
      next("/");
    }
  } catch (error) {
     next("/");
  }
}

const guardForAuthenticationPage = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    // console.log(JSON.stringify(auth.currentUser));
    if (auth.currentUser) {
      next("/tabs/contacts")
    } else {
      next();
    }
  } catch (error) {
     next("/");
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Authentication.vue'),
    beforeEnter: guardForAuthenticationPage
  },
 
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/contacts'
      },
      {
        path: 'cards',
        component: () => import('@/views/Cards.vue'),
        beforeEnter: guard
      },
      {
        path: 'cards/:id',
        component: () => import('@/views/Card.vue'),
        beforeEnter: guard
      },
      {
        path: 'contacts',
        component: () => import('@/views/Contacts.vue'),
        beforeEnter: guard
      },
      {
        path: 'contact/:id',
        component: () => import('@/views/Contact.vue'),
        beforeEnter: guard
      },
      {
        path: 'scaner',
        component: () => import('@/views/Scan.vue'),
        beforeEnter: guard
      },
      {
        path: 'scannedCard/:id',
        component: () => import('@/views/ScannedCard.vue'),
        beforeEnter: guard
      },
      {
        path: 'help',
        component: () => import('@/views/Help.vue'),
        beforeEnter: guard
      },
     
      {
        path: 'addcard',
        component: () => import('@/views/AddCardPage.vue'),
        beforeEnter: guard
      },
      {
        path: 'carddetail/:id',
        component: () => import('@/views/Card.vue'),
        beforeEnter: guard
      },
      {
        path: 'sharecard/:id',
        component: () => import('@/views/ShareCard.vue'),
        beforeEnter: guard
      },
      {
        path: 'editcard/:id',
        component: () => import('@/views/AddCardPage.vue'),
        beforeEnter: guard
      },
      
    ]
  },
  // {
    
  //   path: '/addcard',
  //   component: () => import('@/views/AddCardPage.vue'),
  //   beforeEnter: guard
  // },
  // {
  //   path: '/carddetail/:id',
  //   component: () => import('@/views/Card.vue'),
  //   beforeEnter: guard
  // },
  // {
  //   path: '/contactCard/:id',
  //   component: () => import('@/views/ScannedCard.vue'),
  //   beforeEnter: guard
  // },
  // {
  //   path: '/sharecard/:id',
  //   component: () => import('@/views/ShareCard.vue'),
  //   beforeEnter: guard
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
