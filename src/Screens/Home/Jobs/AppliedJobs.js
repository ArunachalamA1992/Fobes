import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Color from '../../../Global/Color';
import {Poppins} from '../../../Global/FontFamily';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {Media} from '../../../Global/Media';

const AppliedJobs = ({navigation}) => {
  const [ApplyJobData, setApplyJobData] = useState([
    {
      id: 1,
      apply_job_name: 'Business Development Executive',
      apply_job_image: Media.status,
      apply_job_subImage: Media.propertysub,
      apply_job_type: 'Full Time',
      apply_job_post_date: '1 day ago',
      apply_apply_job_comp_logo: '',
      apply_job_comp_name: 'Wipro Technologies ',
      apply_job_comp_book_status: true,
      apply_job_comp_salary: '₹10k -  ₹20 k',
      apply_job_comp_applicant: '500',
      apply_job_comp_loc: 'Coimbatore, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
    {
      id: 2,
      apply_job_name: 'Mobile App Development',
      apply_job_image: Media.status,
      apply_job_subImage: Media.AuctionSub,
      apply_job_type: 'Full Time',
      apply_job_post_date: '3 days ago',
      apply_job_comp_logo: '',
      apply_job_comp_name: 'TCS',
      apply_job_comp_book_status: false,
      apply_job_comp_salary: '₹40k -  ₹70 k',
      apply_job_comp_applicant: '250',
      apply_job_comp_loc: 'Chennai, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
    {
      id: 3,
      apply_job_name: 'Graphics Designer',
      apply_job_image: Media.status,
      apply_job_subImage: Media.propertysub,
      apply_job_type: 'Freelance',
      apply_job_post_date: '1 day ago',
      apply_job_comp_logo: '',
      apply_job_comp_name: 'KGISL Group',
      apply_job_comp_book_status: false,
      apply_job_comp_salary: '₹30k -  ₹50 k',
      apply_job_comp_applicant: '50',
      apply_job_comp_loc: 'Coimbatore, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
    {
      id: 4,
      apply_job_name: 'Website designer',
      apply_job_image: Media.status,
      apply_job_subImage: Media.AuctionSub,
      apply_job_type: 'Full Time',
      apply_job_post_date: '4 days ago',
      apply_job_comp_logo: '',
      apply_job_comp_name: 'Brightway Group Tech',
      apply_job_comp_book_status: false,
      apply_job_comp_salary: '₹25k -  ₹60 k',
      apply_job_comp_applicant: '7',
      apply_job_comp_loc: 'Madurai, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
    {
      id: 5,
      apply_job_name: 'SEO Analyst',
      apply_job_image: Media.status,
      apply_job_subImage: Media.AuctionSub,
      apply_job_type: 'Part Time',
      apply_job_post_date: '2 days ago',
      apply_job_comp_logo: '',
      apply_job_comp_name: 'Avanexa Technologies',
      apply_job_comp_book_status: false,
      apply_job_comp_salary: '₹15k -  ₹30 k',
      apply_job_comp_applicant: '15',
      apply_job_comp_loc: 'Chennai, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
    {
      id: 6,
      apply_job_name: 'Website designer',
      apply_job_image: Media.status,
      apply_job_subImage: Media.AuctionSub,
      apply_job_type: 'Full Time',
      apply_job_post_date: '4 days ago',
      apply_job_comp_logo: '',
      apply_job_comp_name: 'Brightway Group Tech',
      apply_job_comp_book_status: false,
      apply_job_comp_salary: '₹25k -  ₹60 k',
      apply_job_comp_applicant: '7',
      apply_job_comp_loc: 'Coimbatore, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
    {
      id: 7,
      apply_job_name: 'SEO Analyst',
      apply_job_image: Media.status,
      apply_job_subImage: Media.AuctionSub,
      apply_job_type: 'Part Time',
      apply_job_post_date: '2 days ago',
      apply_job_comp_logo: '',
      apply_job_comp_name: 'Avanexa Technologies',
      apply_job_comp_book_status: false,
      apply_job_comp_salary: '₹15k -  ₹30 k',
      apply_job_comp_applicant: '15',
      apply_job_comp_loc: 'Madurai, Tamilnadu',
      apply_job_exp: '0-3 years',
      applu_job_applicant: '20',
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={ApplyJobData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}
              onPress={() => {
                navigation.navigate('JobStatus', {item});
              }}>
              <View style={{paddingVertical: 10}}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: '#EFFAFF',
                    padding: 5,
                    borderRadius: 50,
                  }}>
                  <Image
                    source={require('../../../assets/images/app_status.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.lightBlack,
                        fontFamily: Poppins.Bold,
                        textAlign: 'justify',
                      }}
                      numberOfLines={2}>
                      {item.apply_job_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.darkGrey,
                        fontFamily: Poppins.Medium,
                        textAlign: 'justify',
                      }}
                      numberOfLines={1}>
                      {item.apply_job_comp_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'chevron-forward-outline'}
                      icon_size={22}
                      icon_color={Color.lightBlack}
                    />
                  </View>
                </View>
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
                    fontFamily: Poppins.Medium,
                    paddingHorizontal: 5,
                  }}>
                  {item.apply_job_comp_loc}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 7,
                    paddingHorizontal: 10,
                    backgroundColor: '#DEFCE4',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome'}
                    iconname={'check-square'}
                    icon_size={20}
                    icon_color={'#0BA02C'}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.black,
                      borderRadius: 5,
                      fontFamily: Poppins.Medium,
                      paddingHorizontal: 5,
                    }}>
                    Applied 2 days ago
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      padding: 7,
                      paddingHorizontal: 10,
                      backgroundColor: '#E9F9F6',
                      fontSize: 12,
                      color: Color.lightBlack,
                      borderRadius: 5,
                      fontFamily: Poppins.Medium,
                    }}>
                    {item.apply_job_type}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      padding: 7,
                      paddingHorizontal: 10,
                      backgroundColor: '#E9F9F6',
                      fontSize: 12,
                      color: Color.lightBlack,
                      borderRadius: 5,
                      fontFamily: Poppins.Medium,
                    }}>
                    {item.apply_job_comp_salary}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});
export default AppliedJobs;
