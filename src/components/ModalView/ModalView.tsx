import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Modal, StyleSheet, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { style } from './style';

export const ModalView = ({ visible, setModalVisible }: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!visible);
            }}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Text style={style.modalText}>Hello World!</Text>
                    <Pressable
                        onPress={() => setModalVisible(!visible)}>
                        <Text style={styles.textTitle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
