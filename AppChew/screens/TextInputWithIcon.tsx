import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ITextInputWithIconProps from '../interfaces/ITextInputWithIconProps';

const TextInputWithIcon: React.FC<ITextInputWithIconProps> = ({
  icon,
  iconSize = 20,
  iconColor = '#000',
  containerStyle,
  borderColor = 'gray',
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={icon} size={iconSize} color={iconColor} style={styles.icon} />
      <TextInput {...textInputProps} style={styles.input} />
    </View>
  );
};

const styles = {
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
  },
};

export default TextInputWithIcon;
