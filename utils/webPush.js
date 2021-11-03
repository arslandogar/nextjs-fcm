import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function () {
    initializeApp({
      apiKey: "AIzaSyDw_F57rqncjXGFwxd6e35gzwUv-AwetEM",
      authDomain: "nextjs-fcm.firebaseapp.com",
      projectId: "nextjs-fcm",
      storageBucket: "nextjs-fcm.appspot.com",
      messagingSenderId: "58107421046",
      appId: "1:58107421046:web:a7091e34f0b64320df1a57",
    });

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }
      await Notification.requestPermission();
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey:
          "BMvf3PiIWmxwcDyeGRjoMYH1pM1BbpCfH6Dc5TbIeV0i1gk1LtpZFpwgN44PipPU0Kk8hlOWddgst6uQKm5hVl0",
      });
      localforage.setItem("fcm_token", token);
      console.log("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
