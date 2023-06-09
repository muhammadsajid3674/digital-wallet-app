import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES, icons, images } from '../constant'

function Home() {



  const featuresData = [
    {
      id: 1,
      icon: icons.reload,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: "Top Up"
    },
    {
      id: 2,
      icon: icons.send,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,
      description: "Transfer"
    },
    {
      id: 3,
      icon: icons.internet,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: "Internet"
    },
    {
      id: 4,
      icon: icons.wallet,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: "Wallet"
    },
    {
      id: 5,
      icon: icons.bill,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,
      description: "Bill"
    },
    {
      id: 6,
      icon: icons.game,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: "Games"
    },
    {
      id: 7,
      icon: icons.phone,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: "Mobile Prepaid"
    },
    {
      id: 8,
      icon: icons.more,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: "More"
    },
  ]

  const specialPromoData = [
    {
      id: 1,
      img: images.promoBanner,
      title: "Bonus Cashback1",
      description: "Don't miss it. Grab it now!"
    },
    {
      id: 2,
      img: images.promoBanner,
      title: "Bonus Cashback2",
      description: "Don't miss it. Grab it now!"
    },
    {
      id: 3,
      img: images.promoBanner,
      title: "Bonus Cashback3",
      description: "Don't miss it. Grab it now!"
    },
    {
      id: 4,
      img: images.promoBanner,
      title: "Bonus Cashback4",
      description: "Don't miss it. Grab it now!"
    },
  ]
  const [features, setFeatures] = useState(featuresData);
  const [specialPromos, setSpecialPromos] = useState(specialPromoData);

  const renderHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SIZES.padding * 2 }}>
      <View style={{ flexDirection: 'column', flexGrow: 1 }}>
        <Text style={{ ...FONTS.h1 }}>Hello</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Sajid Shahid</Text>
      </View>
      <TouchableOpacity style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightGray, borderRadius: 50 }}>
        <Image source={icons.bell} resizeMode='contain' style={{ height: 20, width: 20, tintColor: COLORS.secondary }} />
        <View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 10,
          height: 10,
          backgroundColor: COLORS.red,
          borderRadius: 5
        }} />
      </TouchableOpacity>
    </View>
  )

  const renderBanner = () => (
    <View style={{
      height: 120,
      borderRadius: 20
    }}>
      <Image source={images.banner} resizeMode='cover' style={{ width: "100%", height: "100%", borderRadius: 20 }} />
    </View>
  );

  const renderFeatures = () => {
    ListHeaderComponent = { Header }
    const Header = () => (
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h3 }}>Features</Text>
      </View>
    )
    const renderItem = ({ item }) => (
      <TouchableOpacity style={{
        marginBottom: SIZES.padding * 2,
        width: 60,
        alignItems: 'center'
      }} onPress={() => console.log(item.description)}>
        <View style={{
          height: 50,
          width: 50,
          marginBottom: 5,
          borderRadius: 20,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={item.icon} resizeMode='contain' style={{
            height: 20,
            width: 20,
            tintColor: item.color
          }} />
        </View>
        <Text style={{
          fontWeight: 700
        }}>{item.description}</Text>
      </TouchableOpacity>
    );
    return <FlatList
      ListHeaderComponent={Header}
      data={features}
      numColumns={4}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      style={{ marginTop: SIZES.padding * 2 }}
    />
  };

  const renderPromos = () => {

    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    )

    const renderPromoHeader = () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SIZES.padding * 2 }}>
        <View style={{ flexGrow: 1 }}>
          <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("View All")}>
          <Text style={{ ...FONTS.body4, color: COLORS.gray }}>View All</Text>
        </TouchableOpacity>
      </View>
    )

    const renderItem = ({ item }) => (
      <TouchableOpacity style={{
        marginVertical: SIZES.base,
        width: SIZES.width / 2.5
      }} onPress={() => console.log(item.title)}>
        <View style={{
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.primary
        }}>
          <Image source={images.promoBanner} resizeMode='cover' style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }} />
        </View>
        <View style={{
          padding: SIZES.padding,
          backgroundColor: COLORS.lightGray,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20
        }}>
          <Text style={{ ...FONTS.h5, fontWeight: 700 }}>{item.title}</Text>
          <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={specialPromos}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderPromos()}
    </SafeAreaView>
  )
}

export default Home;