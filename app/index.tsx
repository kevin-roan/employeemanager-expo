import { Text, View, Button } from "react-native";
import auth from "@react-native-firebase/auth";

export default function Index() {
  const user = auth().currentUser;
  const handleAuth = async () => {
    console.log("authentication begin");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="authenticate" onPress={handleAuth} />
    </View>
  );
}
