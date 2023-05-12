import React from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, Modal, FlatList, KeyboardAvoidingView, ScrollView } from 'react-native'
import { COLORS, SIZES, FONTS, icons, images } from '../constant';
import LinearGradient from 'react-native-linear-gradient';

export default function SignUp() {

  const myHeader = new Headers();
  myHeader.append("apikey", "pf5FcRDspg1NJtcM211Oh0SDZzwRVVE9");
  const reqOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeader
  }


  const [showPassword, setShowPassword] = React.useState(false);
  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetch("https://api.apilayer.com/number_verification/countries", reqOptions)
      .then(res => res.json())
      .then(data => {
        let areaData = Object.entries(data).map(item => ({
          code: item[0],
          name: item[1].country_name,
          callingCode: item[1].dialling_code,
          flag: `https://flagsapi.com/${item[0]}/flat/64.png`
        }))
        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultArea = areaData.filter(item => item.code == "US");
          if (defaultArea.length > 0) {
            setSelectedArea(defaultArea[0])
          }
        }
      })
      .catch(err => console.log(err))
  }, [])


  const renderHeader = () => {
    return <TouchableOpacity style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SIZES.padding * 2,
      paddingHorizontal: SIZES.padding * 2
    }} onPress={() => console.log("Sign Up!")}>
      <Image source={icons.back} resizeMode='contain' style={{
        width: 20,
        height: 20,
        tintColor: COLORS.white
      }} />
      <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Sign Up</Text>
    </TouchableOpacity>
  }

  const renderLogo = () => {
    return <View style={{
      marginTop: SIZES.padding * 5,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Image source={images.wallieLogo} resizeMode='contain' style={{ width: '60%' }}></Image>
    </View>
  }

  const renderForm = () => {
    return <View style={{ marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding * 3 }}>
      {/* Full Name */}
      <View style={{ marginTop: SIZES.padding * 3 }}>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>Full Name</Text>
        <TextInput style={{
          marginVertical: SIZES.padding,
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
          height: 40,
          color: COLORS.white,
          ...FONTS.body3
        }}
          placeholder='Enter Full Name'
          placeholderTextColor={COLORS.white}
          selectionColor={COLORS.white}
        />
      </View>
      {/* Phone Number */}
      <View style={{ marginTop: SIZES.padding * 3 }}>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>Phone Number</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{
            width: 100,
            height: 50,
            marginHorizontal: 5,
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            flexDirection: 'row',
            ...FONTS.body2
          }}
            onPress={() => setModalVisible(true)}
          >
            <View style={{ justifyContent: 'center' }}>
              <Image source={icons.down} resizeMode='contain' style={{ width: 10, height: 10, tintColor: COLORS.white }}></Image>
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
              <Image source={{ uri: selectedArea?.flag }} resizeMode='contain' style={{ width: 30, height: 30 }}></Image>
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{selectedArea?.callingCode}</Text>
            </View>
          </TouchableOpacity>
          <TextInput style={{
            flex: 1,
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.white,
            ...FONTS.body3
          }}
            placeholder='Enter Phone Number'
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>
      </View>
      {/* Password */}
      <View style={{ marginTop: SIZES.padding * 3 }}>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>Password</Text>
        <TextInput style={{
          marginVertical: SIZES.padding,
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
          height: 40,
          color: COLORS.white,
          ...FONTS.body3
        }}
          placeholder='Enter Password'
          placeholderTextColor={COLORS.white}
          selectionColor={COLORS.white}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={{
          position: 'absolute',
          right: 0,
          bottom: 10,
          height: 30,
          width: 30
        }} onPress={() => setShowPassword(!showPassword)}>
          <Image source={showPassword ? icons.disable_eye : icons.eye} resizeMode='contain' style={{ height: 20, width: 20, tintColor: COLORS.white }} />
        </TouchableOpacity>
      </View>
    </View>
  }

  const renderAreaCodeModal = () => {
    const renderItem = ({ item }) => {
      console.log(item);
      return <TouchableOpacity style={{ padding: SIZES.padding, flexDirection: 'row' }} onPress={() => { setSelectedArea(item); setModalVisible(false) }}>
        <Image source={{ uri: item.flag }} resizeMode='contain' style={{ width: 30, height: 30, marginRight: 10 }} />
        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>{item.name}</Text>
      </TouchableOpacity>
    }
    return <Modal
      animationType='slide'
      transparent
      visible={modalVisible}
    >
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{
            height: 400,
            width: SIZES.width * 0.8,
            backgroundColor: COLORS.lightGreen,
            borderRadius: SIZES.radius
          }}>
            <FlatList
              data={areas}
              renderItem={renderItem}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
              style={{ padding: SIZES.padding * 2, marginBottom: SIZES.padding * 2 }} />
          </View>
        </View>
      </TouchableWithoutFeedback>

    </Modal >
  }

  const renderButton = () => {
    return <View style={{ margin: SIZES.padding * 2.5 }}>
      <TouchableOpacity style={{
        height: 60,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.radius / 1.5,
        alignItems: 'center',
        justifyContent: 'center'
      }}
        onPress={() => console.log("Navigate to Home")}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]} style={{ flex: 1 }}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodeModal()}
    </KeyboardAvoidingView>
  )
}