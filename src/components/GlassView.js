import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default function GlassView({ children, style, intensity = 50, tint = 'dark', ...props }) {
  // Daha okunaklı olması için şeffaflık (opacity) seviyesi artırıldı.
  const baseAlpha = Math.max(0.7, Math.min(0.98, (intensity / 100) + 0.3));
  let backgroundColor = `rgba(15, 15, 20, ${baseAlpha})`; // dark tint

  if (tint === 'light') {
    backgroundColor = `rgba(240, 240, 245, ${baseAlpha})`;
  } else if (tint === 'default') {
    backgroundColor = `rgba(20, 20, 25, ${baseAlpha})`;
  }

  // Removed backdropFilter completely as react-native-web style compiler crashes on unsupported properties.
  // The rgba background color is fully sufficient for the glassmorphism effect.
  return (
    <View 
      style={[
        { backgroundColor },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
}
