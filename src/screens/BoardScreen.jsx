import { View } from "react-native"
import Board from "../components/Board"

const BoardScreen = () => {
    return (
        <View style={styles.container}>
            <Board />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default BoardScreen;