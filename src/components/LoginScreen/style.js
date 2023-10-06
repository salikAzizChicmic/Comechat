import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
       flexGrow: 1,
       justifyContent: 'center',
       alignItems: 'center',
      backgroundColor:"#047BD5"
    },
    profileImage: {
      width: wp('30%'),
      height: hp('15%'),
       objectFit:'contain',
       marginBottom:10
      
    },
    
    input: {
      height: 40,
     // width:'100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingLeft: 10,
      marginTop: 15,
      backgroundColor: 'white',
    },
    sectionStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      width: '80%',
      borderRadius: 5,
      marginTop: 15,
    },
    card: { backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    cardBox: { flexDirection: 'column', margin: 20 },
    headerText: { marginLeft: 5, fontSize: 25, fontWeight: 'bold', textAlign: 'center' },
    nameInput: { flex: 1, marginLeft: 9 },
    registerBtn:{
      backgroundColor: "#FF4200",
      padding: 10,
      borderRadius: 10,
      width: 290,
    },
    registerText: { color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
    loginText:{ marginTop: 9, fontSize: 20, fontWeight: '50', color: '#047BD5',marginBottom:10 }
});
  
export default styles;