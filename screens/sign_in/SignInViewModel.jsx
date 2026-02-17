import { useState } from "react";

export const useSignInViewModel = () => {
  const [state, setState] = useState({
    isSignInSuccessful: false,
    signInError: null,
  });

  const onSignInResult = (result) => {
    setState({
      isSignInSuccessful: result?.data != null,
      signInError: result?.errorMessage ?? null,
    });
  };

  const resetState = () => {
    setState({
      isSignInSuccessful: false,
      signInError: null,
    });
  };

  return {
    state,
    onSignInResult,
    resetState,
  };
};
