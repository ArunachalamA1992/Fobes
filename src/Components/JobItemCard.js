import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Gilmer} from '../Global/FontFamily';
import Color from '../Global/Color';
import {Iconviewcomponent} from './Icontag';
import {Media} from '../Global/Media';

const JobItemCard = props => {
  var {item, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailedScreen', {item})}
      style={{
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.lightgrey,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 20,
            backgroundColor: '#DEFCE4',
            fontSize: 12,
            color: '#0BA02C',
            borderRadius: 5,
            fontFamily: Gilmer.Bold,
            paddingVertical: 10,
          }}>
          {item.job_type}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'time-outline'}
            icon_size={20}
            icon_color={Color.Venus}
          />
          <Text
            style={{
              fontSize: 12,
              color: Color.Venus,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            {item.job_post_date}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <Image
          source={Media.user}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
              textAlign: 'justify',
            }}
            numberOfLines={2}>
            {item.job_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              textAlign: 'justify',
            }}
            numberOfLines={1}>
            {item.job_comp_name}
          </Text>
        </View>
        <Iconviewcomponent
          Icontag={'FontAwesome'}
          iconname={'bookmark-o'}
          icon_size={22}
          icon_color={Color.Venus}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Salary/Month
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
              marginTop: 5,
            }}>
            {item.job_comp_salary}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Applicant
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Image
              source={Media.vector}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: Color.primary,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 5,
              }}>
              {item.job_comp_applicant}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const JobCardHorizontal = props => {
  var {item, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailedScreen', {item})}
      style={{
        width: 300,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.lightgrey,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            padding: 5,
            paddingHorizontal: 20,
            backgroundColor: '#DEFCE4',
            fontSize: 12,
            color: '#0BA02C',
            borderRadius: 5,
            fontFamily: Gilmer.Bold,
            paddingVertical: 10,
          }}>
          {item.job_type}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'time-outline'}
            icon_size={20}
            icon_color={Color.Venus}
          />
          <Text
            style={{
              fontSize: 12,
              color: Color.Venus,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            {item.job_post_date}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <Image
          source={Media.user}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
              textAlign: 'justify',
            }}
            numberOfLines={2}>
            {item.job_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Gilmer.Medium,
              textAlign: 'justify',
            }}
            numberOfLines={1}>
            {item.job_comp_name}
          </Text>
        </View>
        <Iconviewcomponent
          Icontag={'FontAwesome'}
          iconname={'bookmark-o'}
          icon_size={22}
          icon_color={Color.Venus}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Salary/Month
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 5,
              marginTop: 5,
            }}>
            {item.job_comp_salary}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Gilmer.Medium,
              paddingHorizontal: 5,
            }}>
            Applicant
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Image
              source={Media.vector}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: Color.primary,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 5,
              }}>
              {item.job_comp_applicant}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobItemCard;
