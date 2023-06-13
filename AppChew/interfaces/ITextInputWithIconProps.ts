import { StyleProp, ViewStyle, TextInputProps } from 'react-native';

interface ITextInputWithIconProps extends TextInputProps {
  icon: string;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  borderColor?: string;
}

export default ITextInputWithIconProps;
