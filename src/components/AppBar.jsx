import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; 
import { Link } from "react-router-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({ container: {
paddingTop: Constants.statusBarHeight,
backgroundColor: '#24292e',
flexDirection: "row"
// ...
},
text: {
    color: 'white',
    margin: 10,
}
// ...
});

const AppBar = () => {
return (
<View style={styles.container}>
<Link to="/">
    <Text style={styles.text}>Lessons</Text>
</Link>
<Link to="/sign-in">
    <Text style={styles.text}>Sign In</Text>
</Link>
</View>
);
};
export default AppBar;