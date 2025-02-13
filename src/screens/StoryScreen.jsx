import { View } from "react-native"
import Story from "../components/Story"
import Menu from "../components/Menu";

const StoryScreen = ({ route }) => {
    const { story } = route.params;

    return (
        <View style={styles.container}>
            <Story story={story} />
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

export default StoryScreen;