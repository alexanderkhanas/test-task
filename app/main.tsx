import {Text} from "react-native";
import {useEffect} from "react";
import remoteConfig from '@react-native-firebase/remote-config';

const Main = () => {
    useEffect(() => {
        const awesomeNewFeature = remoteConfig().getAll();
        console.log('awesomeNewFeature', awesomeNewFeature);
        // awesomeNewFeature.then((res) => {
        //     console.log('resuilt =', res)
        // }).catch((err) => {
        //     console.log('err =', err)
        // })
    }, []);
    return (<Text>this is main screen</Text>)
}

export default Main;
