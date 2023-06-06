import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TextInputWithIconProps extends TextInputProps {
  icon: string;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  borderColor?: string;
}

const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
  icon,
  iconSize = 20,
  iconColor = '#000',
  containerStyle,
  borderColor = 'gray',
  ...textInputProps
}) => {
  return (
    <View
      style={[
        {
          height: 40,
          width: '65%',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor,
          borderRadius: 10,
          marginBottom: 15,
        },
        containerStyle,
      ]}
    >
      <Icon
        name={icon}
        size={iconSize}
        color={iconColor}
        style={{ marginRight: 10, marginLeft: 10 }}
      />
      <TextInput {...textInputProps} style={{ flex: 1 }} />
    </View>
  );
};

export default TextInputWithIcon;
