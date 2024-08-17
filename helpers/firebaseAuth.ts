import auth from "@react-native-firebase/auth";

const signUp = (email: string, password: string) =>
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User account created & signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });

const signIn = (email: string, password: string) =>
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/invalid-credential") {
        console.log("Error: Invalid Email or Password");
      } else {
        console.error(error);
      }
    });

const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      console.log("Sucessfully signed out");
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

export { signUp, signIn, signOut };
