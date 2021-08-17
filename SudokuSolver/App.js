import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './components/Header'
import Board from './components/Board'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Board />
      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
