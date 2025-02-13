import { View } from "react-native"
import Shop from "../components/Shop"
import Menu from "../components/Menu";

const ShopScreen = () => {
    return (
        <View style={styles.container}>
            <Shop />
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

export default ShopScreen;