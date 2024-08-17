import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  View,
  Button,
} from "react-native";
import { useState } from "react";
import auth, { signOut } from "@react-native-firebase/auth";
import { signIn, signUp, signOut } from "@/helpers/firebaseAuth";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = auth().currentUser;
  console.log("CurrentUser", user);

  const handleAuth = async () => {
    await signOut();
  };
  const handleEmailInput = (value: string) => {
    setEmail(value);
  };
  const handlePassInput = (value: string) => {
    setPassword(value);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={handleEmailInput}
          autoCapitalize="none"
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          value={password}
          autoCapitalize="none"
          onChangeText={handlePassInput}
        ></TextInput>
        <Button title="authenticate" onPress={handleAuth} />
      </KeyboardAvoidingView>
    </View>
  );
}
