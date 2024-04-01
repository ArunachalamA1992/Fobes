import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Poppins} from '../../Global/FontFamily';
import {Button} from 'react-native-paper';

const ProjectScreen = ({navigation}) => {
  const [projectSelectedItem, setProjectSelectedItem] = useState({
    title: '',
    project_employment: {},
    project_status: {},
    duration: {
      from: '',
      end: '',
    },
    details: '',
    location: '',
    site: {},
    nature_employment: {},
    team_size: '',
    role_in_project: '',
    role_description: '',
    skills: '',
  });
  const [projectemployment] = useState([
    {
      id: 1,
      name: 'Mobile Apllication Developer',
      value: 'mobile_application_developer',
    },
    {
      id: 2,
      name: 'UG - Computers',
      value: 'ug_computers',
    },
    {
      id: 3,
      name: 'Class XII',
      value: 'class_XII',
    },
    {
      id: 4,
      name: 'Class X',
      value: 'class_X',
    },
  ]);
  const [projectsite] = useState([
    {
      id: 1,
      name: 'Off Site',
      value: 'off_site',
    },
    {
      id: 2,
      name: 'On Site',
      value: 'on_site',
    },
  ]);
  const [nature_employment] = useState([
    {
      id: 1,
      name: 'Full time',
      value: 'full_time',
    },
    {
      id: 2,
      name: 'Part Time',
      value: 'part_time',
    },
    {
      id: 3,
      name: 'Contractual',
      value: 'contractual',
    },
  ]);
  const [projectStatus] = useState([
    {
      id: 1,
      name: 'In Progress',
      value: 'in_progress',
    },
    {
      id: 2,
      name: 'Finished',
      value: 'finished',
    },
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: Poppins.Medium,
            fontSize: 16,
            color: Color.black,
            fontWeight: '500',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          Showcase your talent with the best projects you have worked on during
          college and work
        </Text>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Poppins.Medium,
              fontSize: 14,
              color: Color.black,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            Project Title
          </Text>
          <TextInput
            placeholder="Enter Your Project title"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.title}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Poppins.Bold,
              fontSize: 14,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Tag Project with employment/education
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {projectemployment.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.project_employment?.id == item?.id
                        ? '#9DCBE2'
                        : Color.white,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    paddingHorizontal: 5,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.project_employment?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment: item,
                      project_status: projectSelectedItem?.project_status,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: projectSelectedItem?.site,
                      nature_employment: projectSelectedItem?.nature_employment,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Poppins.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Tag Project with employment/education
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {projectStatus.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.project_status?.id == item?.id
                        ? '#9DCBE2'
                        : Color.white,
                    // width: 150,
                    alignItems: 'center',
                    marginVertical: 10,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.project_status?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment:
                        projectSelectedItem?.project_employment,
                      project_status: item,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: projectSelectedItem?.site,
                      nature_employment: projectSelectedItem?.nature_employment,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{marginVertical: 10, flex: 1}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Worked From
            </Text>
            <TextInput
              placeholder="Worked From"
              placeholderTextColor={Color.cloudyGrey}
              value={projectSelectedItem?.duration?.from}
              onChangeText={text => {
                setProjectSelectedItem({
                  title: projectSelectedItem?.title,
                  project_employment: projectSelectedItem?.project_employment,
                  project_status: projectSelectedItem?.project_status,
                  duration: {
                    from: text,
                    end: projectSelectedItem?.duration?.end,
                  },
                  details: projectSelectedItem?.details,
                  location: projectSelectedItem?.location,
                  site: projectSelectedItem?.site,
                  nature_employment: projectSelectedItem?.nature_employment,
                  team_size: projectSelectedItem?.team_size,
                  role_in_project: projectSelectedItem?.role_in_project,
                  role_description: projectSelectedItem?.role_description,
                  skills: projectSelectedItem?.skills,
                });
              }}
              style={{
                borderBottomColor: Color.cloudyGrey,
                borderBottomWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontWeight: 'bold',
              }}
            />
          </View>
          <View style={{marginVertical: 10, flex: 1}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Worked Till
            </Text>
            <TextInput
              placeholder="Worked Till"
              placeholderTextColor={Color.cloudyGrey}
              value={projectSelectedItem?.duration?.end}
              onChangeText={text => {
                setProjectSelectedItem({
                  title: projectSelectedItem?.title,
                  project_employment: projectSelectedItem?.project_employment,
                  project_status: projectSelectedItem?.project_status,
                  duration: {
                    from: projectSelectedItem?.duration?.from,
                    end: text,
                  },
                  details: projectSelectedItem?.details,
                  location: projectSelectedItem?.location,
                  site: projectSelectedItem?.site,
                  nature_employment: projectSelectedItem?.nature_employment,
                  team_size: projectSelectedItem?.team_size,
                  role_in_project: projectSelectedItem?.role_in_project,
                  role_description: projectSelectedItem?.role_description,
                  skills: projectSelectedItem?.skills,
                });
              }}
              style={{
                borderBottomColor: Color.cloudyGrey,
                borderBottomWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontWeight: 'bold',
              }}
            />
          </View>
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Details of the projects
          </Text>
          <TextInput
            placeholder="Details Of the Project"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.details}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: text,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Project Location
          </Text>
          <TextInput
            placeholder="Project Location"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.location}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: text,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Poppins.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Project Site
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {projectsite.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.site?.id == item?.id
                        ? '#9DCBE2'
                        : Color.white,
                    // width: 150,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.site?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment:
                        projectSelectedItem?.project_employment,
                      project_status: projectSelectedItem?.project_status,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: item,
                      nature_employment: projectSelectedItem?.nature_employment,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Poppins.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Nature of employment
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {nature_employment.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.nature_employment?.id == item?.id
                        ? '#9DCBE2'
                        : Color.white,
                    // width: 150,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.nature_employment?.id == item?.id
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment:
                        projectSelectedItem?.project_employment,
                      project_status: projectSelectedItem?.project_status,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: projectSelectedItem?.site,
                      nature_employment: item,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Size of team
          </Text>
          <TextInput
            placeholder="Enter team size"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.team_size}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: text,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Role of Project
          </Text>
          <TextInput
            placeholder="Enter Role of your Project"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.role_in_project}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: text,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Role Description
          </Text>
          <TextInput
            placeholder="Enter Role Description"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.role_description}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: text,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Skills Used
          </Text>
          <TextInput
            placeholder="Enter your Skills used"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.skills}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: text,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginVertical: 30,
          }}>
          <Button
            mode="contained"
            onPress={async () => {
              try {
                navigation.navigate('Profile');
              } catch (err) {}
            }}
            style={{
              backgroundColor: '#DBF3FF',
              color: Color.red,
            }}
            textColor="#000">
            Delete
          </Button>
          <Button
            mode="contained"
            onPress={async () => {
              try {
                navigation.navigate('Profile');
              } catch (err) {}
            }}
            style={{
              backgroundColor: Color.primary,
              marginHorizontal: 10,
              alignItems: 'flex-end',
            }}
            textColor={Color.white}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectScreen;
