import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES, FONTS, images, icons } from "../Constraint/themes";

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [areas, setAreas] = React.useState([])
  const [selectedArea, setSelectedArea] = React.useState(null)
  const [modalVisible, setModalVisible] = React.useState(false)

  React.useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,idd")
        .then(response => response.json())
        .then(data => {
            let areaData = data.map(item => {
                return {
                    code: item.cca3,
                    name: item.name?.common,
                    flag: item.flags.png,
                    callingCode: item.idd?.root + item.idd?.suffixes[0],
                }
            })
            setAreas(areaData)
            
            if (areaData.length > 0) {
                let defaultData = areaData.filter(a => a.code == "US")

                if (defaultData.length > 0) {
                    setSelectedArea(defaultData[0])
                }
            }
        })
}, [])

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding * 4,
          paddingHorizontal: SIZES.padding * 2,
        }}
      >
        <Image
          source={require("../assets/icons/back.png")}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/images/opay.png")}
          resizeMode="contain"
          style={{ width: "40%" }}
        />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        <View style={{ marginTop: SIZES.padding * 3 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Full Name
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Phone Number
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                flexDirection: "row",
                ...FONTS.body2,
              }}
              // onPress={() => console.log("Show modal")}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/icons/down.png")}
                  // source={{ uri: selectedArea?.flag }}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  // source={require("../assets/images/Nig.png")}
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: 5,
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
                // keyboardType="numeric"
              }}
              keyboardType = 'numeric'
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
        </View>
        {/* {password} */}

        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            password
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              color: COLORS.white,
              height: 40,
              ...FONTS.body3,
            }}
            placeholder="Enter password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            // secureTextEntry={true}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              right: 0,
              bottom: 10,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              //  source={require("../assets/icons/eye.png")}
              // source={showPassword ? ("../assets/icons/eye.png") : ("../assets/icons/eye.png")}
              source={
                showPassword
                  ? require("../assets/icons/eye.png")
                  : require("../assets/icons/disable_eye.png")
              }
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View
        style={{
          margin: SIZES.padding * 3,
        }}
      >
        <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("HomeTabs")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                </TouchableOpacity>
      </View>
    );
  }

  function renderAreaCodesModal() {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ padding: SIZES.padding, flexDirection: 'row' }}
                onPress={() => {
                    setSelectedArea(item)
                    setModalVisible(false)
                }}
            >
                <Image
                    source={{ uri: item.flag }}
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                />
                <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback
                onPress={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            height: 400,
                            width: SIZES.width * 0.8,
                            backgroundColor: COLORS.lightGreen,
                            borderRadius: SIZES.radius
                        }}
                    >
                        <FlatList
                            data={areas}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.code}
                            showsVerticalScrollIndicator={false}
                            style={{
                                padding: SIZES.padding * 2,
                                marginBottom: SIZES.padding * 2
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
  return (
    <KeyboardAvoidingView
      behaviour={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
