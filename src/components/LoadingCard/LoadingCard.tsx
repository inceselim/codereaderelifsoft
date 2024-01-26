import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';

export default function LoadingCard() {
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}>
      <ActivityIndicator size={40} color={colors.primaryColor} />
    </View>
  );
}
