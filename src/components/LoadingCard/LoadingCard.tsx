import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function LoadingCard() {
  return (
    <ActivityIndicator size={40} color={"#fa1"}/>
  );
}
