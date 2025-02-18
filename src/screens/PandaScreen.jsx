import { View } from "react-native"
import Panda from "../components/Panda"

const PandaScreen = () => {
    return (
        <View style={styles.container}>
            <Panda />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default PandaScreen;