import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login( {navigation} ){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const giris = async () => {

    try{

      const kullanici = JSON.parse(await AsyncStorage.getItem('yeniKayit'));
      console.log(kullanici);

      if(kullanici.email == email && kullanici.password == password){
        await AsyncStorage.setItem('isLogin', "true");
        Alert.alert('Giriş Başarılı!', 'Todo listesine yönlendiriliyorsunuz.');
        navigation.navigate("Todo");
      }else{
        Alert.alert('Giriş Başarısız!', 'Hatalı email veya şifre.');
      }

    }catch(error){
      Alert.alert('Hata', 'Giriş yaparken bir hata olustu.');
    }

  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Giriş</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Mail adresiniz" />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Şifreniz" />
        <Button title="Giriş Yap" onPress = {giris} />
        <TouchableOpacity style={styles.kayitBtn}>
          <Text onPress= {() => navigation.navigate('Signup')}>Hesabın yok mu? Kayıt ol.</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  kayitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
})
