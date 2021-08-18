import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function Board() {
    const [board, setBoard] = useState([])
    const [boardOutput, setBoardOutput] = useState([])
    useEffect(() => {

        for (let i = 1; i<= 9; i++) {
            setBoard(prevBoard => [...prevBoard, i])
        }
        for (let i = 0; i<81; i++) {
            setBoardOutput(prevBoard => [...prevBoard, 0])
        }
    }, [])
    const pressHandler = () => {
        //console.log(boardOutput)
        var boardToSend = []
        var boardPlaceholder = []
        for (let i=0; i<81; i++) {
            boardPlaceholder.push(boardOutput[i])
            if((i+1) % 9 == 0) {
                boardToSend.push(boardPlaceholder)
                boardPlaceholder = []
                // console.log(i)
            }
            ////console.log(i)
            


        }
        boardToSend = {
            'board': boardToSend,
        }
        // console.log(JSON.stringify(boardToSend))
        fetch('https://fastapiforsudokusolver.shoter99.repl.co/solve_board',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boardToSend)
        })
        .then(res => res.json())
        .then(res => console.log(res));

    }
    const textChangeHandler = (e, key) => {
        const newBoard = boardOutput 
        newBoard[key] = Number(e) 
        setBoardOutput(newBoard)
        ////console.log(boardOutput[e])
    } 
    

    return (
        <View style={styles.topView}>
            {board.map( (b) =>(
                <View key={b} style={styles.boardView }>
                {board.map((board) => <TextInput onChangeText={(e) => textChangeHandler(e,(((b-1)*9)+board)-1)} keyboardType='numeric' maxLength={1} key={(b-1*9)+board} style={styles.input} />)}
                </View>
            ))}
            
            <TouchableOpacity onPress={pressHandler} style={styles.button}>
                <Text style={styles.buttonText}>Solve</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    boardView: {

        backgroundColor: '#eee',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,


    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        paddingLeft: 10,
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#00BD55',
        borderWidth: 2,
        borderColor: 'black',
        width: 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 20,

    },
})
