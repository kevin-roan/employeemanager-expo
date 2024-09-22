import firestore from "@react-native-firebase/firestore";

const publicFCMtoken = async (fcmtoken: string) => {
  await firestore()
    .collection("fcmtokens")
    .add({
      fcm: fcmtoken,
    })
    .then(() => {
      console.log("fcm published successfully");
    })
    .catch((error) => console.error("error publishing fcm token", error));
};

export { publicFCMtoken };
