import {ChangeEvent, useState} from "react";

type OurFormPropsType = {
    startState: string
    callback: (newState: string) => void
}

export const OurForm = (props: OurFormPropsType) => {

    const [field, setField] = useState<string>(props.startState || '')

    const changeField = (e: ChangeEvent<HTMLInputElement>) => {
        setField(e.currentTarget.value)
    }

    return (
        <div>
            <input value={field} onChange={changeField}/>
        </div>
    )
}