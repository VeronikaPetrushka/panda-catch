import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const Story = ({ story }) => {
    const navigation = useNavigation();

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${story.name}\n\n${story.description}`,
                url: story.image,
            });
        } catch (error) {
            console.log("Error sharing:", error);
        }
    };

    return (
        <View style={styles.container}>

            <Image source={story.image} style={styles.image} />

            <Text style={styles.name}>{story.name}</Text>

            <Text style={styles.description}>{story.description}</Text>

            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.btn, {borderTopRightRadius: 0, borderBottomLeftRadius: 0}]} onPress={handleShare}>
                    <Text style={styles.btnText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {borderTopLeftRadius: 0, borderBottomRightRadius: 0}]} onPress={() => navigation.goBack('')}>
                    <Text style={styles.btnText}>Close</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ff00ff",
        paddingTop: height * 0.07,
        padding: 30,
    },

    image: {
        width: "100%",
        height: 181,
        resizeMode: "cover",
        borderRadius: 22,
        marginBottom: 7,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },

    name: {
        fontSize: 22,
        fontWeight: "500",
        color: "#db151a",
        marginBottom: 13,
    },

    description: {
        fontSize: 14,
        fontWeight: "400",
        color: "#fff",
        lineHeight: 17.07,
        marginBottom: 25,
    },

    btn: {
        width: '44%',
        paddingVertical: 9,
        paddingHorizontal: 42,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#db151a",
        backgroundColor: "#f0a031",
        alignItems: "center",
    },

    btnText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#db151a",
        lineHeight: 24.55
    },

});

export default Story;
