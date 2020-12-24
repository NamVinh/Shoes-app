import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList,Dimensions,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Email from 'react-native-vector-icons/MaterialCommunityIcons'
import Log from 'react-native-vector-icons/AntDesign'
import Lock from 'react-native-vector-icons/FontAwesome5'
import {Card} from 'react-native-paper'
import theme from '../utils/theme'
import PORT from '../utils/port'

const profile = ({navigation}) => {
    const [id_user, setid_user] = useState('');
    const [dataUser, setdataUser] = useState([]);
    const [loading, setloading] = useState(true);
    console.log(id_user + "id user là đây")
    const getdata_idUser = async () => {
        try {
            const idUser = await AsyncStorage.getItem('id_user');
            if (idUser !== null) {
                setid_user(idUser);
                console.log(idUser);
            }
            await fetch(
                `${PORT}/api/v1/user/` + idUser)
                .then((response) => response.json())
                .then((user) => {
                    const { api_code, data } = user;
                    if (api_code === 200) {
                        console.log(data)
                        setdataUser(data);
                        setloading(false);
                    }
                });
        } catch (error) {
            console.log(error + "có lỗi : Err");
        }
    };

    const remmoveValue = async () => {
        try {
            await AsyncStorage.removeItem('id_user')
            await navigation.navigate('login')
        } catch (error) {
            console.log(error + 'có lỗi')
        }
    }

   

   

    const dialog = () => {
        Alert.alert(
          'Thông báo !!!',
          'Bạn có muốn thoát tài khoản',
          [
            {
              text: 'Ask me later',
              onPress: () => console.log('Ask me later pressed'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => remmoveValue()},
          ],
          {cancelable: false},
        );
      };
      

    const _renderItem = ( item ) => {
      const {view,toolbar,title,header,viewimage,image,headerleft,touchableOpacity,body} = styles
        return (
            <View style={styles.view}>
            <View style={styles.toolbar}>
                <Text style={styles.title}>Tài khoản người dùng</Text>
            </View>
            <View style={styles.header}>
                <View style={styles.viewimage}>
                <Image
              source={{
                uri: item.avatar
                  ? item.avatar
                  : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
              }}
              style={{width: '100%', height: 150}}
              resizeMode="contain"
            />
                </View>
                <View style={{flexDirection:'column',}}>
                <View style={styles.headerleft}>
                    <Text style={{color:'white', fontSize: 20}}>Xin chào !!!</Text>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:24}}>
                    {item.name}
                    </Text>
                </View>
                <View style={{height:100,width:"100%", }}>
                
                   <TouchableOpacity onPress={() => navigation.navigate('updateprofile',{item})} >
                   <View style={{flexDirection:'row'}}>
                      <Icon style={styles.iconn} name='pencil-square-o' size={24} color='white'></Icon>
                     <Text> Sửa đổi thông tin </Text>
                     </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('changepass',{item})} >
                    <View style={{flexDirection:'row'}}>
                      <Lock style={styles.iconn} name='user-lock' size={20} color='white'></Lock>
                     <Text>Đổi mật khẩu</Text>
                     </View>
                    </TouchableOpacity>
                
                </View>
                </View>
            </View>
            <View>
             <View>
                 <Card style={{padding:10}}>
                <Text style={{margin:5,fontSize:18,color:'grey'}}>Thông tin liên hệ</Text>
                <View style={{flexDirection:'row',marginLeft:35,marginVertical:10}}>
                <Icon name='phone-square' size={24} color='grey'></Icon>
                <Text style={{marginLeft:10}}>+84{item.phone}</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:35,marginHorizontal:20}}>
                <Email name='email-multiple' size={22} color='grey'></Email>
                <Text style={{marginLeft:10}}>{item.gmail}</Text>
                </View>
                </Card>
             </View>
            </View>
            <View>
             <View style={{marginVertical:5}}>
                 <Card style={{padding:10}}>
                <Text style={{margin:5,fontSize:18,color:'grey'}}>Một số điều khoản</Text>
                <View style={{flexDirection:'row',marginLeft:35,marginVertical:5}}>
                <Text style={{marginLeft:5,color:'grey'}}>Mốt số nguyên tắt khi quý khách mua hàng ở Insane Shop và mong quý khách áp dụng</Text>
                </View>
                </Card>
             </View>
            </View>
            <View>
             <View style={{marginVertical:5}}>
             <TouchableOpacity onPress={() => dialog()}>
             <Card style={{padding:10,justifyContent:'center',flexDirection:'row'}}>
                <Text style={{margin:5,fontSize:18,color:'grey'}}>Thoát tài khoản</Text>
                <Log style={{position:'absolute',right:0}} name="logout" size={20} color='grey'></Log>
                </Card>
             </TouchableOpacity>
             </View>
            </View>

            </View>
        );
    };

    useEffect(() => {
        getdata_idUser();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={dataUser}
                renderItem={({ item }) => {
                    return _renderItem(item);
                }}
                keyExtractor={(item) => item._id}
                onRefresh={() => getdata_idUser()}
                refreshing={loading}
                ></FlatList>
        </View>
    );
};

export default profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    view:{
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flexDirection:'column'
    },
    toolbar:{
        height:60,
        backgroundColor:theme.COLOR_PRIMARY,
    },
    title:{
        position:'absolute',
        bottom:5,
        left:20,
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    header:{
        flexDirection:'row',
        height: Dimensions.get('window').height/4,
        backgroundColor:theme.COLOR_PRIMARY
    },
    viewimage:{
        height:'100%',
        width:150,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        height:130,
        width:130,
        borderRadius:130
    },
    headerleft:{
        justifyContent:'center',
        height:'50%',
        width:"100%",
        marginLeft:20
    },
    iconn:{
        height:40,
        width:45,
        borderRadius:45,
        borderWidth:1,
        borderColor:'white',
        padding: 10,
        marginRight: 10,
    },
    body:{
        flexDirection:'column',
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    }
});
