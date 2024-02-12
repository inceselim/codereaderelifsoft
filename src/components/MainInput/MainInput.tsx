import React from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { styles } from '../../styles/styles';

export default function MainInput({
    value,
    setValue,
    placeholder,
    children,
    secureTextEntry
}: any) {
    return (
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <TextInput style={styles.textInputPassword}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor={"#666"}
            />
            {children}
        </View>
    )
}
