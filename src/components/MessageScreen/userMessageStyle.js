import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
  
const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', backgroundColor: '#F5F5F5' },
    headerBox: { backgroundColor: '#F5F5F5', height: "8%" },
    headerContainer: { flexDirection: 'row', marginVertical: 10, marginHorizontal: 10, justifyContent: 'space-between', marginBottom: 20 },
    headerImg: { height: 20, width: 20 },
    headerText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
    msgBoxContainer: { height: '85%', backgroundColor: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40, },
    msgBox: { height: '88%', borderTopLeftRadius: 40, borderTopRightRadius: 40 },
    msgScroll: { height: '100%', width: '100%', },
    msgTextDesign: { marginHorizontal: 15, marginVertical: 10, color: 'white' },
    bottomScroll: { backgroundColor: '#F5F5F5', height: '100%',marginBottom:10 },
    sendBoxContainer:{
        backgroundColor:"white",
        flexDirection: 'row',
        justifyContent: 'center',
         marginHorizontal:20,
        marginVertical:20,
        height: hp('7%'),
          width: wp('90%'),
        borderRadius:20,
        
    },
    sendBox:{
        borderRadius:20,
      width: wp('9%'),
      padding: wp('1%'),
      backgroundColor:'white',
        justifyContent: 'center',
      
    },
    attachImg: { height: 25, width: 25, marginLeft: 1 },
    sendInputbox: { flex: 1, backgroundColor: 'white' },
    sendImgContainer:
    {
        borderRadius:20,
        width: wp('7%'),
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    sendImg: { height: hp('2.8%'), width: wp('6%'), objectFit: 'fill' },
    dateBox: { flexDirection: 'row', marginHorizontal: 40, marginTop: 10 },
    dateStrip: { flex: 2, height: 1, width: '100%', backgroundColor: 'lightgrey' },
    timeFont :{ fontSize: 9, padding: 6, marginTop: 5 }
    
});
  
export default styles;