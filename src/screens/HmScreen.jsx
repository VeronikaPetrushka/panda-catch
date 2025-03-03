import { View } from "react-native"
import Hm from "../components/Hm"

const HmScreen = () => {
    return (
        <View style={styles.container}>
            <Hm />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default HmScreen;