import { View } from "react-native"
import Personal from "../components/Personal"
import Menu from "../components/Menu";

const PersonalScreen = () => {
    return (
        <View style={styles.container}>
            <Personal />
            <View style={styles.menu}>
                <Menu />
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