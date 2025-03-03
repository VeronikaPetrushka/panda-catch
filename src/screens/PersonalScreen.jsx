import { View } from "react-native"
import Personal from "../components/Personal"
import Panel from "../components/Panel";

const PersonalScreen = () => {
    return (
        <View style={styles.container}>
            <Personal />
            <View style={styles.menu}>
                <Panel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0
    }
}

export default PersonalScreen;