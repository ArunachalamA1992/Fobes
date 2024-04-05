import {Platform, ToastAndroid, LayoutAnimation, UIManager} from 'react-native';
import {pick} from 'react-native-document-picker';

const common_fn = {
  showToast: msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },
  Accordion: () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  },
  AccordionAnimation: () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },
  calculateProfileCompletion: (resume, skills, details) => {
    const totalFields = 3;
    let completedFields = 0;

    if (resume != null && resume?.name?.length > 0) {
      completedFields++;
    }
    if (skills?.length > 0) {
      completedFields++;
    }
    if (details?.length > 0) {
      completedFields++;
    }

    return parseInt((completedFields / totalFields) * 100);
  },
  profileupdate: async (id, navigation) => {
    try {
      if (id == 1) {
        const [{name, uri}] = await pick();
        return {name, uri};
      } else if (id == 2) {
        return navigation.navigate('Skill');
      } else if (id == 3) {
        return navigation.navigate('basicdetails');
      }
    } catch (err) {}
  },
};
export default common_fn;
