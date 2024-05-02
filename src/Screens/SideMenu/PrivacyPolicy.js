import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Gilmer} from '../../Global/FontFamily';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: Media.privacy}}
          style={{
            width: '100%',
            height: 220,
            resizeMode: 'contain',
          }}
        />
        <View style={{width: '100%', paddingHorizontal: 10}}>
          <View
            style={{
              width: '100%',
              paddingVertical: 10,
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'justify',
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Gilmer.Bold,
                lineHeight: 25,
                letterSpacing: 0.5,
              }}>
              This privacy policy explains how we collect, use and protect your
              personal information when you visit our job portal website. We
              respect your privacy and are committed to safeguarding your data
              in accordance with applicable laws and regulations. By using our
              website, you consent to the terms of this policy.
            </Text>
          </View>

          <View style={{width: '100%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                  letterSpacing: 0.5,
                }}>
                We collect personal information from you when you register on
                our website, create a profile, upload a resume, apply for a job,
                or contact us. The types of information we collect may include
                your name, email address, phone number, location, education,
                work experience, skills, references and other relevant details.
                We use this information to provide you with our services, match
                you with suitable job opportunities, communicate with you and
                improve our website.
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                  letterSpacing: 0.5,
                }}>
                We do not sell or share your personal information with third
                parties without your consent, except as required by law or to
                fulfil a legitimate business purpose. We may disclose your
                information to our affiliates or partners who help us operate
                our website or provide services to you. We may also transfer
                your information in the event of a merger, acquisition or sale
                of our business.
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                  letterSpacing: 0.5,
                }}>
                We take reasonable measures to protect your personal information
                from unauthorized access, use or disclosure. However, we cannot
                guarantee the security of your data transmitted over the
                internet or stored on our servers.You are responsible for
                keeping your password and account details confidential and for
                logging out of your account when using a shared device.
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                  letterSpacing: 0.5,
                }}>
                You have the right to access, update or delete your personal
                information at any time by logging into your account or
                contacting us. You can also opt out of receiving marketing
                emails from us by following the unsubscribe link in the email.
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                  letterSpacing: 0.5,
                }}>
                We may update this privacy policy from time to time to reflect
                changes in our practices or legal obligations. We will notify
                you of any material changes by posting them on our website or
                sending you an email. Your continued use of our website after
                such notice constitutes your acceptance of the revised policy.
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginVertical: 10,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              Contact Us
            </Text>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                color: '#666',
                fontFamily: Gilmer.Light,
                lineHeight: 20,
                letterSpacing: 0.5,
                paddingTop: 10,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={22}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                +91 994-330-0100
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={22}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  width: '95%',
                  fontSize: 18,
                  color: 'black',
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                  paddingHorizontal: 10,
                }}>
                admin@fobes.in
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 30,
              paddingHorizontal: 10,
              marginBottom: 70,
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/logos/fobes.png')}
                style={{width: '80%', height: 50, resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                  color: '#666',
                  fontFamily: Gilmer.Medium,
                  lineHeight: 25,
                  letterSpacing: 0.5,
                }}>
                You are hired! Get yourself registered. The top companies in the
                league are hiring now.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  NumberBoxConatiner: {
    width: '88%',
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
    width: '88%',
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
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Gilmer-SemiBold',
    color: Color.red,
  },
});

export default PrivacyPolicy;
