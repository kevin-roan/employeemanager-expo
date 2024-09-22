import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { signIn, signOut } from "@/helpers/firebaseAuth";
import { getAuth } from "@react-native-firebase/auth";
import PushNotifications from "@/helpers/pushnotifications";
import { PermissionsAndroid } from "react-native";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { publicFCMtoken } from "@/helpers/firebaseDB";
import { schedulePushNotification } from "@/helpers/pushnotifications";
import { setBackgroundMessageHandler } from "@react-native-firebase/messaging";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmtoken, setFcmToken] = useState("");

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
      let message = JSON.stringify(remoteMessage);
      console.log(remoteMessage.data.body);
      schedulePushNotification(
        (message = remoteMessage.data.title),
        (body = remoteMessage.data.body),
      );
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    async function getFcmToken() {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log("FCM Token:", token);
    }
    getFcmToken();

    return unsubscribe;
  }, []);

  const handleAuth = async () => {
    signIn("kevinroan@gmail.com", "ludanlomdi");
    if (fcmtoken.length > 0) {
      await publicFCMtoken(fcmtoken);
    }
  };
  const handleEmailInput = (value: string) => {
    setEmail(value);
  };
  const handlePassInput = (value: string) => {
    setPassword(value);
  };
  return <PushNotifications />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

//
// //    <View style={styles.container}>
//       <KeyboardAvoidingView behavior="padding">
//         <TextInput
//           placeholder="Enter email"
//           value={email}
//           onChangeText={handleEmailInput}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         ></TextInput>
//         <TextInput
//           placeholder="Enter password"
//           secureTextEntry
//           value={password}
//           autoCapitalize="none"
//           onChangeText={handlePassInput}
//         ></TextInput>
//         <Button title="authenticate" onPress={handleAuth} />
//       </KeyboardAvoidingView>
//     </View>
//
