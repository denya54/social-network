export const required = (value: string) => {
    if (value) {
        return undefined
    } else {
        return 'Field is empty'
    }
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
}