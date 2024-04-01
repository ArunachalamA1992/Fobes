//import liraries
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Vibration,
    ActivityIndicator,
} from 'react-native';

import { RadioButton } from 'react-native-paper';
import Color from '../../Global/Color';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from '@react-navigation/native';


// create a component
const FilterScreen = () => {

    const navigation = useNavigation();
    const [cat, setCat] = useState(false);
    const [selectedDateValue, setSelectedDateValue] = useState('option1');
    const [selectedExpValue, setSelectedExpValue] = useState('option1');
    const [selectedDistValue, setSelectedDistValue] = useState('option1');
    const [selectJobTypeValue, setSelectJobTypeValue] = useState('option1');
    const [selectWorkTypeValue, setSelectWorkTypeValue] = useState('option1');
    const [selectInd, setselectInd] = useState('');
    const [selectItem, setSelectItem] = useState(false);

    const [category, setCategory] = useState([
        { id: 1, 'title': 'Custom software development', checked: true },
        { id: 2, 'title': 'Software Prototyping', checked: false },
        { id: 3, 'title': 'DevOps Automation', checked: false },
        { id: 4, 'title': 'Web Application Development', checked: false },
        { id: 5, 'title': 'Mobile Application Development', checked: false },
        { id: 6, 'title': 'Cloud Computing', checked: false },
    ]);

    const handleDatePostPress = (value) => {
        setSelectedDateValue(value);
        // You can add your custom logic here based on the selected value
        switch (value) {
            case 'option1':
                // Execute actions for Option 1
                console.log('Option 1 selected');
                break;
            case 'option2':
                // Execute actions for Option 2
                console.log('Option 2 selected');
                break;
            case 'option3':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            case 'option4':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            default:
                break;
        }
    };

    const handleExpPress = (value) => {
        setSelectedExpValue(value);
        // You can add your custom logic here based on the selected value
        switch (value) {
            case 'option1':
                // Execute actions for Option 1
                console.log('Option 1 selected');
                break;
            case 'option2':
                // Execute actions for Option 2
                console.log('Option 2 selected');
                break;
            default:
                break;
        }
    };

    const handleDistancePress = (value) => {
        setSelectedDistValue(value);
        // You can add your custom logic here based on the selected value
        switch (value) {
            case 'option1':
                // Execute actions for Option 1
                console.log('Option 1 selected');
                break;
            case 'option2':
                // Execute actions for Option 2
                console.log('Option 2 selected');
                break;
            case 'option3':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            case 'option4':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            default:
                break;
        }
    };

    const handleJobTypePress = (value) => {
        setSelectJobTypeValue(value);
        // You can add your custom logic here based on the selected value
        switch (value) {
            case 'option1':
                // Execute actions for Option 1
                console.log('Option 1 selected');
                break;
            case 'option2':
                // Execute actions for Option 2
                console.log('Option 2 selected');
                break;
            case 'option3':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            case 'option4':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            default:
                break;
        }
    };


    const handleWorkTypePress = (value) => {
        setSelectWorkTypeValue(value);
        // You can add your custom logic here based on the selected value
        switch (value) {
            case 'option1':
                // Execute actions for Option 1
                console.log('Option 1 selected');
                break;
            case 'option2':
                // Execute actions for Option 2
                console.log('Option 2 selected');
                break;
            case 'option3':
                // Execute actions for Option 3
                console.log('Option 3 selected');
                break;
            default:
                break;
        }
    };

    // function selectedIndItem(item) {
    //     try {
    //         setselectInd(item.ind_name);
    //         setSelectItem(item.ind_applied);
    //     } catch (error) {
    //         console.log('catch in selectedInd_Item : ', error);
    //     }
    // }

    function test(index) {
        console.log(index);
        setselectInd(index);
        const industryData = [...category];
        industryData[index].checked = !industryData[index].checked;
        setCategory(industryData);
    }


    function applyFilterClick() {
        try {
            console.log("Date Posted ========== :" + selectedDateValue + "\n" + "Experience ========= :" + selectedExpValue + "\n" +
                "Distance ========= :" + selectedDistValue + "\n" + "Job Type ========= :" + selectJobTypeValue + "\n" + "Industry ======= :" + selectInd + "\n" +
                "Work Type ========= :" + selectWorkTypeValue);
        } catch (error) {
            console.log('catch in applyFilter_Click : ', error);
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Date Posted</Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={(value) => handleDatePostPress(value)}
                            value={selectedDateValue}>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option1" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>All</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 13 }}>
                                    <RadioButton value="option2" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Past week</Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option3" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Past month</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <RadioButton value="option4" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Past 24 hours</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Experience</Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={(value) => handleExpPress(value)}
                            value={selectedExpValue}
                        >
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option1" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Fresher</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 5 }}>
                                    <RadioButton value="option2" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Experienced</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Distance</Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={(value) => handleDistancePress(value)}
                            value={selectedDistValue}>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option1" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>All</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 6 }}>
                                    <RadioButton value="option2" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Within 5 km</Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option3" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Within 10 km</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <RadioButton value="option4" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Within 50 km</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Job Type</Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={(value) => handleJobTypePress(value)}
                            value={selectJobTypeValue}>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option1" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Full-time</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 6 }}>
                                    <RadioButton value="option2" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Part-time</Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option3" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Contract</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <RadioButton value="option4" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Internship</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                        <View style={{ width: '95%', paddingVertical: 10, padding: 10 }}>
                            <Text style={{ textAlign: 'left', fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Location</Text>
                        </View>

                        <TouchableOpacity style={{ width: '90%', height: 50, backgroundColor: Color.white, borderColor: Color.Venus, borderWidth: 0.5, borderRadius: 5, marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ width: '100%', textAlign: 'left', fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold, paddingHorizontal: 10 }}>Select Location </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                        <View style={{ width: '95%', paddingVertical: 10, padding: 10 }}>
                            <Text style={{ textAlign: 'left', fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Industry</Text>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                            <FlatList
                                data={category}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center' }}>
                                        <CheckBox
                                            // title={"Test Test"}
                                            // iconRight
                                            value={item?.checked}
                                            onChange={() => test(index)}
                                            size={30}
                                        />
                                        <Text>{item.title}</Text>
                                    </View>
                                )}
                            />
                        </View>

                    </View>

                    <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Work Type</Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={(value) => handleWorkTypePress(value)}
                            value={selectWorkTypeValue}>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option1" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>On-site</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 6 }}>
                                    <RadioButton value="option2" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Hybrid</Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                                    <RadioButton value="option3" color={Color.primary} />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Bold }}>Remote</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => applyFilterClick()} activeOpacity={0.5} style={{ width: '90%', height: 50, backgroundColor: Color.primary, borderColor: Color.Venus, borderWidth: 0.5, borderRadius: 5, marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ width: '100%', textAlign: 'center', fontSize: 16, color: Color.white, fontFamily: Poppins.Bold, paddingHorizontal: 10 }}>Apply </Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text>Selected Value: {selectedValue}</Text> */}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    textStyle: {
        marginHorizontal: 20,
        marginTop: 10,
        color: 'black',
        fontWeight: '600',
    },
    singleRadioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
});

//make this component available to the app
export default FilterScreen;
