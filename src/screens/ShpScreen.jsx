import { View } from "react-native"
import Shp from "../components/Shp"
import Panel from "../components/Panel";

const ShpScreen = () => {
    return (
        <View style={styles.container}>
            <Shp />
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

export default ShpScreen;