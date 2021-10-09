import firebase from '../../utils/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// eslint-disable-next-line
export default function() {

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
  };

  return ( <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> )
}