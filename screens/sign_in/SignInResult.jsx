export const createUserData = ({
  userId,
  username = null,
  profilePictureUrl = null,
}) => ({
  userId,
  username,
  profilePictureUrl,
});

export const createSignInResult = ({
  data = null,
  errorMessage = null,
}) => ({
  data,
  errorMessage,
});
