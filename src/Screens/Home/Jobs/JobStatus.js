import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../../Global/Color';
import {Gilmer} from '../../../Global/FontFamily';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {Button} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import {Media} from '../../../Global/Media';
import fetchData from '../../../Config/fetchData';
import common_fn from '../../../Config/common_fn';
import {useSelector} from 'react-redux';

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.cloudyGrey,
  labelSize: 15,

  currentStepIndicatorSize: 30,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Color.primary,
  stepIndicatorCurrentColor: Color.primary,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: Color.white,
  currentStepLabelColor: Color.black,

  separatorFinishedColor: Color.primary,
  stepIndicatorFinishedColor: Color.primary,
  stepIndicatorLabelFinishedColor: 'white',

  separatorUnFinishedColor: '#ddd',
  stepIndicatorUnFinishedColor: '#ddd',
  stepIndicatorLabelUnFinishedColor: 'white',
};

const labels = [
  'Applied',
  'Application Viewed',
  'Application Shortlisted by HR',
];

const JobStatus = ({navigation, route}) => {
  const [itemData] = useState(route.params.item);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [similarJobs, setSimilarJobs] = useState([
    {
      id: 1,
      name: 'Website designer',
      image: Media.status,
      subImage: Media.AuctionSub,
      type: 'Full Time',
      post_date: '4 days ago',
      comp_logo: '',
      comp_name: 'Brightway Group Tech',
      comp_book_status: false,
      comp_salary: '₹25k -  ₹60 k',
      comp_applicant: '7',
      comp_loc: 'Coimbatore, Tamilnadu',
    },
    {
      id: 2,
      name: 'Website designer',
      image: Media.status,
      subImage: Media.AuctionSub,
      type: 'Full Time',
      post_date: '4 days ago',
      comp_logo: '',
      comp_name: 'Brightway Group Tech',
      comp_book_status: false,
      comp_salary: '₹25k -  ₹60 k',
      comp_applicant: '7',
      comp_loc: 'Coimbatore, Tamilnadu',
    },
    {
      id: 3,
      name: 'Website designer',
      image: Media.status,
      subImage: Media.AuctionSub,
      type: 'Full Time',
      post_date: '4 days ago',
      comp_logo: '',
      comp_name: 'Brightway Group Tech',
      comp_book_status: false,
      comp_salary: '₹25k -  ₹60 k',
      comp_applicant: '7',
      comp_loc: 'Coimbatore, Tamilnadu',
    },
  ]);

  const getToggleJobs = async id => {
    try {
      var data = {job_id: id};
      const Saved_Jobs = await fetchData.toggle_bookmarks(data, token);
      if (Saved_Jobs) {
        common_fn.showToast(Saved_Jobs?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#EFFAFF',
              padding: 5,
              borderRadius: 50,
            }}>
            <Image
              source={itemData?.apply_job_image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                fontFamily: Gilmer.Bold,
                textAlign: 'center',
              }}
              numberOfLines={2}>
              {itemData.apply_job_name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.darkGrey,
                fontFamily: Gilmer.Medium,
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {itemData.apply_job_comp_name}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Iconviewcomponent
              Icontag={'Fontisto'}
              iconname={'map-marker-alt'}
              icon_size={20}
              icon_color={Color.Venus}
            />
            <Text
              style={{
                fontSize: 14,
                color: Color.Venus,
                fontFamily: Gilmer.Medium,
                paddingHorizontal: 5,
              }}>
              {itemData.apply_job_comp_loc}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={async () => {}}
            style={{
              width: '50%',
              backgroundColor: '#DBF3FF',
              color: Color.primary,
              borderRadius: 10,
              marginVertical: 10,
            }}
            textColor="#000">
            View Job Description
          </Button>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={'clock-outline'}
              icon_size={20}
              icon_color={Color.Venus}
            />
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginVertical: 10,
              }}>
              Applied {itemData?.apply_job_post_date}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: Gilmer.Bold,
            fontSize: 18,
            color: Color.black,
            textTransform: 'capitalize',
            marginHorizontal: 5,
            marginVertical: 10,
          }}>
          Application Status
        </Text>
        <View
          style={{
            flex: 1,
            height: 180,
          }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
            stepCount={3}
            labels={labels}
            direction="vertical"
          />
          <View style={{position: 'absolute', top: 10, right: 10}}>
            <Image
              source={require('../../../assets/images/app_status.png')}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: Gilmer.Bold,
            fontSize: 18,
            color: Color.black,
            textTransform: 'capitalize',
            marginHorizontal: 5,
            marginVertical: 10,
          }}>
          Similar Jobs
        </Text>
        {similarJobs.map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Image
                  source={require('../../../assets/images/app_status.png')}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain',
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 18,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                    }}>
                    {item?.name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getToggleJobs(item?.id);
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome'}
                    iconname={item?.is_saved ? 'bookmark' : 'bookmark-o'}
                    icon_size={22}
                    icon_color={item?.is_saved ? Color.primary : Color.Venus}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Fontisto'}
                    iconname={'map-marker-alt'}
                    icon_size={20}
                    icon_color={Color.primary}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Gilmer.Medium,
                      paddingHorizontal: 5,
                    }}>
                    {itemData.apply_job_comp_loc}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Gilmer.Medium,
                    paddingHorizontal: 5,
                  }}>
                  {itemData.apply_job_exp}
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    backgroundColor: '#DEFCE4',
                    paddingHorizontal: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 12,
                      color: Color.green,
                    }}>
                    {itemData?.apply_job_type}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    Salary/Month
                  </Text>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 18,
                      color: Color.primary,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                    }}>
                    {itemData?.apply_job_comp_salary}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    Applicant
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Iconviewcomponent
                      Icontag={'MaterialCommunityIcons'}
                      iconname={'shield-account'}
                      icon_size={20}
                      icon_color={Color.primary}
                    />
                    <Text
                      style={{
                        fontFamily: Gilmer.Bold,
                        fontSize: 18,
                        color: Color.primary,
                        textTransform: 'capitalize',
                        marginHorizontal: 5,
                      }}>
                      {itemData?.applu_job_applicant}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default JobStatus;
