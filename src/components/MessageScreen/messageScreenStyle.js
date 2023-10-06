import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%' },
    headerText: { color: 'black', fontSize: 30, fontWeight: 'bold', marginStart: 20, marginVertical: 15 },
    searchContainer : {
      backgroundColor:"white",
      flexDirection: 'row',
      justifyContent: 'center',
        marginLeft: 20,
        marginRight: 15,
      
      height: hp('7%'),
        width: wp('90%'),
      borderRadius:20,
      
    },
    searchbox:{
      borderRadius:20,
    width: wp('9%'),
    padding: wp('1%'),
    backgroundColor:'white',
      justifyContent: 'center',
    
    },
    searchImg: { height: 20, width: 20, marginLeft: 1 },
    searchInput: { flex: 1, backgroundColor: 'white' },
    micView:{
      borderRadius:20,
      width: wp('7%'),
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    micImg: { height: hp('2.8%'), width: wp('5%') },
  borderStripe: { width: "100%", height: 1, backgroundColor: 'lightgrey', marginTop: 20, marginBottom: 10 },
  errorMsg: { fontWeight: "600", fontSize: 15, textAlign: 'center' },
  msgScroll: { width: '100%' },
});
  
export default styles;