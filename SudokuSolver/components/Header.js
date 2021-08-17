import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Sudoku Solver</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 120,
        paddingTop: 60,
        backgroundColor: 'gray'
    },
    title: {
        fontSize: 24,
        paddingLeft: 15,
    }
})
