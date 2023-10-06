import React,{useEffect, useState} from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
  import styles from './style';
  
import { CometChat } from '@cometchat-pro/react-native-chat';
import { useNavigation } from '@react-navigation/native';
import { STRING,IMAGES } from '../../constant/Strings';
import LoadingBar from '../LoadingBar/LoadingBar';

const Login = () => {
    const [isLogin, setIsLogin] = useState(false)
    const navigation = useNavigation();
    const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
   const [loading,setLoading]=useState(false)


  function Logout() {
      setLoading(true)
        CometChat.logout().then(
          () => {
            setLoading(false)
          }, error => {
            setLoading(false)
              Alert.alert("Logout failed with exception:",{error});
            }
        );
        setLoading(false)
    }
  useEffect(() => {
    Logout()
  },[])
    function handleLogin(uuid,name) {
        let UID = uuid.trim();
        let Name = name.trim();
        let authKey = STRING.AUTH_KEY ;
        CometChat.getLoggedinUser().then(
          
          user => {
            if (user) {
              Logout()
            }
            else if (!user) {
                setLoading(true)
                CometChat.login(UID, authKey).then(
                  user => {
                    setLoading(false)
                        if (user.name === Name) {
                          //Alert.alert("Logged in as "+user.name)
                            
                          navigation.navigate("MessageScreen", { id: UID })
                          
                            setIsLogin(true)
                            
                        } else {
                          Alert.alert(STRING.INVALID_USER_MSG)
                        }
              
                  }, error => {
                    setLoading(false)
                    Alert.alert(STRING.LOGIN_FAILED_MSG)
            }
          );
        }
        }, error => {
          setLoading(false)
            Alert.alert("Something went wrong", error);
        }
    );
    }
  function handleRegPage() {
    navigation.navigate("Register")
  }
  
  const handleUserId = (text) => { setUuid(text) }
  const handleName = (text) => setName(text)
  const handleLoginCall= ()=>handleLogin(uuid,name)
      return (
    
        <ScrollView contentContainerStyle={styles.container}>
          {loading && <LoadingBar/>}
            <Image source={IMAGES.LOGO} style={styles.profileImage} />
            
            <View style={styles.card}>
            <View style={styles.cardBox}>
              <Text style={styles.headerText}>{ STRING.LOGIN_PAGE_HEADING}</Text>
              <TextInput
                style={styles.input}
                placeholder={STRING.USER_ID}
                          
                          onChangeText={handleUserId}
              />
              <View style={styles.sectionStyle}>
                <TextInput
                  style={styles.nameInput}
                  placeholder={STRING.NAME}
                  onChangeText={handleName}
                />
                
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.registerBtn}
                   onPress={handleLoginCall}   
            >
              <Text style={styles.registerText}>{ STRING.LOGIN_PAGE_HEADING.split(' ')[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegPage}>
              <Text style={styles.loginText}>
                {STRING.NEW_USER}
              </Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
       
      );
};
    
export default Login