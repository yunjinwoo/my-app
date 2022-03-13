import { Container, Grid, Box, List, ListItemText, ToggleButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import IconButton from '@mui/material/IconButton';

import React, { useRef, useState } from 'react';

import {InputArea} from "./component/InputArea"
import {ResultArea} from "./component/ResultArea"
import {uniq} from "lodash"


function App() {
  const [resultText, set_resultText] = useState<string[]>([])
  const [selectedNum, set_selectedNum] = useState<any>({});
  const goodNum = useRef<string>("")

  const numCheck = (num:string):boolean => {
    return uniq(num).length === 3
  }
  const onReset = () => {
    goodNum.current = Math.floor(Math.random() * 11)
    +""+Math.floor(Math.random() * 11)
    +""+Math.floor(Math.random() * 11)
    if( !numCheck(goodNum.current) ){
      onReset()
    }
    set_resultText([])
    set_selectedNum({})
  }
  
  const onClick = (inputNum:string) => {
    if( goodNum.current.length === 0 ){
      onReset()
    }
    if( !numCheck(inputNum) ){
      alert("error " + inputNum)
      return
    }
    let cnt_s = 0
    let cnt_b = 0
    for (let i = 0 ; i < inputNum.length; i++) {
      if( goodNum.current[i] === inputNum[i] ){
        cnt_s++
      }else if(goodNum.current.indexOf(inputNum[i]) !== -1){
        cnt_b++
      }
    }

    if( cnt_s === 3 ){
      set_resultText([...resultText , inputNum + " GOOD NUMBER!"])
    }else{
      set_resultText([...resultText , "["+inputNum+"]" + cnt_s + "S " + cnt_b +"B"])
    }
    console.log(goodNum, inputNum, resultText)
  }
  // const handleFormat = (event, newFormats) => {
  //   setFormats(newFormats);
  // };
  return (
    <Container maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item xs={8} >
          <InputArea onClick={onClick} onReset={onReset}/>
        </Grid>
        
        <Grid item xs={8} >
        <Grid item xs={4} >
        <List >
          {resultText.map((e:string)=>{
            return (
              <ListItemText primary={e} />
            )
          })}
          </List>
        </Grid>

        <Grid item xs={8} >
          {/*
           ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
          </ToggleButtonGroup */}
          {Array(10).fill(10).map((s:any,i:number) =>{
            return (
              <ToggleButton  
                value={i}
                selected={selectedNum["check"+i]}
                onChange={() => {
                  let flag = selectedNum["check"+i]
                  if( flag === true || flag === false ){
                    flag = false
                  }
                  set_selectedNum({...selectedNum , ["check"+i]:!flag});
                }}
              >{i}</ToggleButton >
            )
          } )}
        </Grid>

          {/* <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
              {resultText.join("")}
          </Box> */}
        </Grid>
        
      </Grid>
      {/* <Collapse in={open}>
        <Alert
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse> */}

    </Container>
  );
}

export default App;
