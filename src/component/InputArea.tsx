import { Button, TextField } from "@mui/material"
import { useRef } from "react"

type inputAreaProp = {
    onClick:(inputNum:string) => void
    onReset:() => void
}
export const InputArea = ({onClick, onReset}:inputAreaProp) => {
    const data1 = useRef<string>("")
    const data2 = useRef<string>("")
    const data3 = useRef<string>("")

    const changeData1 = (e:any) => {
        data1.current = e.target.value
    }
    const changeData2 = (e:any) => {
        data2.current = e.target.value
    }
    const changeData3 = (e:any) => {
        data3.current = e.target.value
    }
    return (
        <>
            숫자야구 : 

            <TextField id="num1" onChange={changeData1} inputProps={{ maxLength: 3 }} label="num1" variant="outlined" />
            {/* <TextField id="num2" onChange={changeData2} inputProps={{ maxLength: 1 }} label="num2" variant="outlined" />
            <TextField id="num3" onChange={changeData3} inputProps={{ maxLength: 1 }} label="num3" variant="outlined" /> */}

            <Button variant="contained" onClick={(e)=>{
                onClick(data1.current ) //+ data2.current + data3.current)
            }}>확인</Button>
            <Button variant="outlined" onClick={(e)=>{
                onReset()
            }}>Reset</Button>
        </>
    )
}