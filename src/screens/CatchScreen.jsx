import { View } from "react-native"
import Catch from "../components/Catch"

const CatchScreen = () => {
    return (
        <View style={styles.container}>
            <Catch />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CatchScreen;