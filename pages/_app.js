import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/webPush";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    firebaseCloudMessaging.init();
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert(
        `title: ${payload.notification.title} body: ${payload.notification.title}`
      );
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
