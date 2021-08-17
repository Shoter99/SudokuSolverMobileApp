import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function Board() {
    const [board, setBoard] = useState([])

    useEffect(() => {
        for (let i = 1; i<= 9; i++) {
            setBoard(prevBoard => [...prevBoard, i])
        }
    }, [])

    

    return (
        <View style={styles.topView}>
            {board.map( (b) =>(
                <View key={b} style={styles.boardView }>
                {board.map((board) => <TextInput key={(b*9)+board}  id={(b*9)+board} style={styles.input} />)}
                </View>
            ))}
            

                
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        marginTop: 20,
    },
    boardView: {
        margin: 20,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: 40,
        height: 40,
    }
})
