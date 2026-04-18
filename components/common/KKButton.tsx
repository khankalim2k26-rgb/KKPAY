// components/common/KKButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

type KKButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'outline' | 'danger' | 'success';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function KKButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  ...props
}: KKButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          button: styles.outline,
          text: styles.textOutline,
          loaderColor: '#0066FF',
        };
      case 'danger':
        return {
          button: styles.danger,
          text: styles.textDanger,
          loaderColor: '#fff',
        };
      case 'success':
        return {
          button: styles.success,
          text: styles.textSuccess,
          loaderColor: '#fff',
        };
      default: // primary
        return {
          button: styles.primary,
          text: styles.textPrimary,
          loaderColor: '#fff',
        };
    }
  };

  const { button, text, loaderColor } = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        button,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.75} // nice touch feedback
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <Text style={[styles.text, text]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
    minHeight: 52,
  },

  // Variants
  primary: {
    backgroundColor: '#0066FF',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0066FF',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  success: {
    backgroundColor: '#34C759',
  },

  // Text colors
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  textPrimary: { color: '#ffffff' },
  textOutline: { color: '#0066FF' },
  textDanger: { color: '#ffffff' },
  textSuccess: { color: '#ffffff' },

  // States
  disabled: {
    opacity: 0.55,
  },
  fullWidth: {
    width: '100%',
  },
});