import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView, BlurViewProps } from 'expo-blur';
import { useColorScheme } from 'nativewind';

interface GlassViewProps extends ViewProps {
  intensity?: number;
  tint?: BlurViewProps['tint'];
  border?: boolean;
}

export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  intensity = 30,
  tint,
  border = true,
  ...props
}) => {
  const { colorScheme } = useColorScheme();
  
  const defaultTint = tint || (colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={[styles.container, border && styles.border, style]} {...props}>
      <BlurView
        intensity={intensity}
        tint={defaultTint}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.2)',
  },
});
