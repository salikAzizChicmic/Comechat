import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: { borderWidth: 1, borderColor: 'lightgrey' },
    boxContainer:{flexDirection:'row'},
    circleImg: { height: 80, width: 80, borderRadius: 50, marginStart: 10, marginVertical: 9 },
    detailsCont: { flexDirection: 'column' },
    namesStyle: { color: 'black', fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, marginTop: 8, marginBottom: 5 },
    lastMessage: { marginStart: 20, width: 240 },
    flexBox: { flexDirection: 'row' },
    timeText:{ marginHorizontal: 3 }
});
  
export default styles;