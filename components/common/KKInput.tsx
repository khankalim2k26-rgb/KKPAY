// components/common/KKInput.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface KKInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  secureTextEntry?: boolean; // for PIN / password
  rightIcon?: keyof typeof Ionicons.glyphMap; // optional icon on right
  onRightIconPress?: () => void;
}

export default function KKInput({
  label,
  error,
  containerStyle,
  inputStyle,
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  placeholder,
  value,
  onChangeText,
  ...props
}: KKInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSecure, setShowSecure] = useState(secureTextEntry);

  const borderColor = error ? '#FF3B30' : isFocused ? '#0066FF' : '#E0E0E0';

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          { borderColor },
          error && styles.errorBorder,
          isFocused && styles.focused,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={showSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#0066FF"
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons
              name={rightIcon}
              size={22}
              color={isFocused ? '#0066FF' : '#666'}
            />
          </TouchableOpacity>
        )}

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowSecure(!showSecure)}
            style={styles.rightIcon}
          >
            <Ionicons
              name={showSecure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={isFocused ? '#0066FF' : '#666'}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  rightIcon: {
    paddingLeft: 12,
  },
  focused: {
    borderColor: '#0066FF',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
});