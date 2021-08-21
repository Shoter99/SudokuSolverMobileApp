import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'

export default function Board() {
    const [board, setBoard] = useState([])
    const [boardOutput, setBoardOutput] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState('.')
    const [solveResult, setSolveResult] = useState([])
    const [isSolveResultSet, setIsSolveResultSet] = useState(false)
    useEffect(() => {

        for (let i = 1; i<= 9; i++) {
            setBoard(prevBoard => [...prevBoard, i])
        }
        for (let i = 0; i<81; i++) {
            setBoardOutput(prevBoard => [...prevBoard, 0])
        }
    }, [])
    const showAlert = (text) => {
        Alert.alert(text)
    }


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
        // Sending board to API 
        setLoading(true)
        var loadingDots = setInterval(() =>{
            if(loadingText == '.'){
                setLoadingText('..')
                
            }
            else if(loadingText == '..'){
                setLoadingText('...')
            }
            else if(loadingText == '...'){
                setLoadingText('.')
                
            }
        }, 2000)
        fetch('https://fastapiforsudokusolver.shoter99.repl.co/solve_board',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boardToSend)
        })
        .then(res => {
            setLoading(false)
            clearInterval(loadingDots)
            if (!res.ok)
            {
                showAlert('Something went wrong, try again later!')
                
            } 
            
            return res.json()

        })
        .then(res => {
            setSolveResult(res.solution)
            setIsSolveResultSet(true)
        })

    }
    const textChangeHandler = (e, key) => {
        const newBoard = boardOutput 
        newBoard[key] = Number(e) 
        setBoardOutput(newBoard)
        ////console.log(boardOutput[e])
    }
    const goBack = () => {
        setIsSolveResultSet(false)
    } 
    const boardView = () => {
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
    const loadingView = () => {
        return (
            <View style={styles.loadingView}>
                <Text style={styles.loadingText}>Solving{loadingText}</Text>
            </View>
        )
    } 

    const ResultPage = () => {
        
        return (
            <View style={styles.resultPageView}> 

                <View style={styles.topView}>
                    {solveResult.map((obj, i) => (
                        <View key={i} style={styles.boardView}>
                        {obj.map((o, index)=>
                            <Text key={index} style={styles.input} >{o}</Text>)}
                        </View>
                    )
                    )}
                
                </View>
                <View style={styles.bottomView}>
                <TouchableOpacity style={styles.button} onPress={goBack}>
                    <Text style={styles.buttonText}>Go back</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>

            {isSolveResultSet  ? ResultPage() : loading ? loadingView() : boardView()}
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    loadingText: {
        color: '#00c853',
        fontSize: 24,
    },
    resultView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    resultText: {
        fontSize: 20,
        borderWidth: 1,
        padding: 10,
    },
    bottomView: {
        alignItems: 'center',
        justifyContent: 'center',

    }
})
