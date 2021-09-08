import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert, TouchableHighlight} from 'react-native';

export default function App() {
  const [topText,setTopText]= useState("")
  const [bottomText,setBottomText]= useState("")
  const [randomImg,setRandomImg]= useState("http://i.imgflip.com/1bij.jpg")
  const [allMemeImgs,setAllMemeImgs]=useState([])
  const [color,setColor]=useState("#0091E7")
  fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes}=response.data
        setAllMemeImgs(memes)
  })
  const generate=(event)=>{
    event.preventDefault();
    const img= Math.floor(Math.random()*allMemeImgs.length)
      setRandomImg(allMemeImgs[img].url);
      setColor("white")
  }
  return (
    <View style={styles.container}>
      <Text>MEME GENERATOR</Text>
      <TextInput 
        placeholder="Top text"
        style={styles.TextInput}
        value={topText}
        onChangeText={setTopText}
      />
      <TextInput 
        placeholder="Bottom text"
        style={styles.TextInput}
        value={bottomText}
        onChangeText={setBottomText}
      />
      <TouchableHighlight style={styles.button} underlayColor='#0091E7' onPressOut={()=>setColor("#0091E7")}  onPressIn={(event)=>generate(event)}>
        <Text style={{color:color}}>Generate</Text>
      </TouchableHighlight>

      <View style={styles.meme}>
        <Text style={{color:'black',textTransform:'uppercase'}}>{topText}</Text>
        <Image
          source={{uri:randomImg}}
          style={{width:'100%',height:'auto',minHeight:'50%',maxHeight:'80%'}}
        />
        <Text style={{color:'black',textTransform:'uppercase'}}>{bottomText}</Text>
      </View>
      
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
  TextInput:{
    borderStyle:'solid',
    borderColor:'black',
    borderWidth:2,
    borderRadius:5,
    height:35,
    width:'90%',
    margin:5, 
    padding:7,
  },
  button:{
    borderStyle:'solid',
    backgroundColor:'white',
    color:'white',
    width:100,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    borderWidth:3,
    borderColor:'#0091E7',
    margin:10
  },
  meme:{
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle:'solid',
    borderWidth:0,
    borderColor:'black',
    textTransform:'uppercase',
    width:'80%',
    height:'auto',
    padding:0,
  },

});
