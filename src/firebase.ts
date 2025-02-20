import {initializeApp} from 'firebase/app';
import {getRemoteConfig} from 'firebase/remote-config';


const firebaseConfig = {
    appId: '1:161428970931',
    projectId: 'book-app-cc0a8',
    apiKey: 'AIzaSyBNwpiSeMuovdEmIwYrjRvBTJ77to1XCVE',
    storageBucket: 'book-app-cc0a8.appspot.com',
};

const app = initializeApp({
    ...firebaseConfig,
    authDomain: '161428970931-3clq7gf1d2u58km2ir97oip6efs9e1ju.apps.googleusercontent.com'
});
const remoteConfig = getRemoteConfig(app)


export {app, remoteConfig};
