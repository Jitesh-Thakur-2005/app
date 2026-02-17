import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

/* -------------------- */
/* Configure Google */
/* -------------------- */

const [request, response, promptAsync] = Google.useAuthRequest({
  expoClientId: "547295595269-b6e15cnqsmbdq64ujnbj2p4lc5s5si06.apps.googleusercontent.com",
  androidClientId: "547295595269-b6e15cnqsmbdq64ujnbj2p4lc5s5si06.apps.googleusercontent.com",
  // iosClientId: "YOUR_IOS_CLIENT_ID",
});

/* -------------------- */
/* Sign In */
/* -------------------- */

export const signInWithGoogle = async () => {
  try {
    const result = await promptAsync();

    if (result.type !== "success") {
      return {
        data: null,
        errorMessage: "Google sign in cancelled",
      };
    }

    const { id_token } = result.authentication;

    const credential = GoogleAuthProvider.credential(id_token);

    const userCredential = await signInWithCredential(
      auth,
      credential
    );

    const user = userCredential.user;

    return {
      data: {
        userId: user.uid,
        username: user.displayName,
        profilePictureUrl: user.photoURL,
      },
      errorMessage: null,
    };
  } catch (error) {
    console.log("Sign in error:", error);
    return {
      data: null,
      errorMessage: error.message,
    };
  }
};

/* -------------------- */
/* Sign Out */
/* -------------------- */

export const signOutGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Sign out error:", error);
  }
};

/* -------------------- */
/* Get Current User */
/* -------------------- */

export const getSignedInUser = () => {
  const user = auth.currentUser;

  if (!user) return null;

  return {
    userId: user.uid,
    username: user.displayName,
    profilePictureUrl: user.photoURL,
  };
};
