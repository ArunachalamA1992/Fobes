import React, {Component} from 'react';
import {Modal, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageZoom from './imageZoom';
import Color from '../../Global/Color';

const {width, height} = Dimensions.get('window');
export default class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, active: 0};
  }

  render() {
    var {images} = this.props;
    var {visible, active} = this.state;
    return (
      <View style={{height: 220}}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={visible}
          onRequestClose={() => this.setState({visible: false})}>
          <View style={{backgroundColor: Color.transparantBlack, flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ImageZoom
                index={active}
                images={images}
                width={width}
                height={height}
              />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => this.setState({visible: false})}>
              <Text
                style={{opacity: 1, color: Color.white, fontWeight: 'bold'}}>
                Close
              </Text>
              <Icon name={'close'} size={22.5} color={Color.white} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
