import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView, Modal
} from 'react-native';
import Color from '../../Global/Color';
import { Media } from '../../Global/Media';
import { useSelector } from 'react-redux';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Gilmer } from '../../Global/FontFamily';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { LottieCheck } from '../../Components/Lottie';

const ContactUs = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [modalVisible, setModalVisible] = useState(true);

  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  async function sendMessageFunc() {
    try {
      if (username != '' && email != '' && subject != '' && message != '') {
        // console.log("Check ========= :", username + "\n" + " Email ----- :" + email + "\n" + "Subejct ------- :" + subject + "\n" + "Message -------- :" + message);

        var data = {
          name: username,
          email: email,
          subject: subject,
          message: message,
        };
        const contactUsResponse = await fetchData.contactUsData(data, token);
        // console.log("response ======== : ", JSON.stringify(contactUsResponse));
        if (contactUsResponse?.status == true) {
          common_fn.showToast(contactUsResponse?.message);
          setModalVisible(true);
          setUsername("");
          setEmail("");
          setSubject("");
          setMessage("");
          navigation.replace('Home');
        } else {
          common_fn.showToast(contactUsResponse?.message);
          setUsername("");
          setEmail("");
          setSubject("");
          setMessage("");
        }
      } else {
        common_fn.showToast('Please fill mandatory fields');
      }
    } catch (error) {
      console.log('catch in sendMessage_Func : ', error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: Media.contactUs }}
          style={{
            width: '100%',
            height: 220,
            resizeMode: 'contain',
          }}
        />
        <View style={{}}>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#666',
                fontFamily: Gilmer.Medium,
                paddingTop: 10,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={20}
                  iconstyle={{ color: Color.primary }}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: Gilmer.Bold,
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                }}>
                +91 9943300100
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={20}
                  iconstyle={{ color: Color.primary }}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                }}>
                admin@fobes.in
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: Gilmer.Medium,
              }}>
              Registered Address:
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingTop: 10,
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Level 5, Tamarai Tech Park,
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              S.P. Plot No. 16-19 & 20 A,{' '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Thiru Vi Ka Industrial Estate, Inner Ring Road,{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Guindy, Chennai,
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                paddingVertical: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Tamil Nadu, 600 032, India.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Gilmer.Bold,
            }}>
            Get In Touch
          </Text>

          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                padding: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Enter Your Name
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor={Color.grey}
                value={username}
                keyboardType="name-phone-pad"
                onChangeText={text => {
                  setUsername(text);
                  // console.log('text --------- :', text);
                }}
                style={styles.numberTextBox}
              />
            </View>
            {/* <Text style={styles.invalidLogin}>{error}</Text> */}

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                padding: 5,
                marginTop: 20,
                fontFamily: Gilmer.Medium,
              }}>
              Enter Your E-mail
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={Color.grey}
                value={email}
                keyboardType="email-address"
                onChangeText={text => {
                  setEmail(text);
                  // console.log('text --------- :', text);
                }}
                style={styles.numberTextBox}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginTop: 20,
                padding: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Enter your Subjects
            </Text>
            <View style={[styles.incomeBoxConatiner]}>
              <TextInput
                placeholder="Enter your Subjects"
                placeholderTextColor={Color.grey}
                value={subject}
                keyboardType="name-phone-pad"
                onChangeText={text => {
                  setSubject(text);
                }}
                style={styles.numberTextBox}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginTop: 20,
                padding: 5,
                fontFamily: Gilmer.Medium,
              }}>
              Enter your Message
            </Text>
            <TextInput
              placeholder="Enter your Message ..."
              placeholderTextColor={Color.cloudyGrey}
              value={message}
              textAlignVertical="top"
              onChangeText={text => {
                setMessage(text);
              }}
              multiline
              style={{
                fontSize: 15,
                color: Color.black,
                padding: 10,
                height: 150,
                width: '100%',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                marginVertical: 5,
                borderRadius: 5,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => sendMessageFunc()}
            activeOpacity={0.7}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
              backgroundColor: Color.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{ fontSize: 16, color: 'white' }}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
            marginBottom: 50,
          }}>
          <Image
            source={require('../../assets/logos/fobes.png')}
            style={{
              height: 50,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 18,
                color: Color.primary,
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              Fobes Skill Itech Private Limited
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                paddingVertical: 5,
                color: '#666',
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              You are hired! Get yourself registered. The top companies in the
              league are hiring now.
            </Text>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => { }}
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Color.transparantBlack,
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              style={{ flex: 1, backgroundColor: Color.transparantBlack }}
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <View
              style={{
                backgroundColor: Color.white,
                padding: 30,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
              }}
                style={{ position: 'absolute', right: 0, padding: 10 }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'closecircleo'}
                  icon_size={30}
                  iconstyle={{ color: Color.primary }}
                />
              </TouchableOpacity>
              <Text style={{ width: '100%', textAlign: 'center', fontSize: 20, paddingVertical: 10, color: Color.primary, fontFamily: Gilmer.Medium }}>Thanks for contact us</Text>

              <View
                style={{
                  alignItems: 'center',
                }}>
                {/* <Image
                  source={require('../../assets/logos/fobes.png')}
                  style={{ width: 100, height: 80, resizeMode: 'contain' }}
                /> */}
                <LottieCheck />

                <Text style={{ width: '100%', textAlign: 'justify', fontSize: 16, color: Color.lightBlack, fontFamily: Gilmer.Medium }}>We appreciate you contacting the Fobes support team, and we will be in touch with you shortly.</Text>
              </View>

            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  NumberBoxConatiner: {
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  incomeBoxConatiner: {
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  numberTextBox: {
    width: '100%',
    height: 50,
    color: Color.black,
    fontSize: 16,
    fontFamily: 'Gilmer-Regular',
  },
  invalidLogin: {
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Gilmer-SemiBold',
    color: Color.red,
  },
});

export default ContactUs;
