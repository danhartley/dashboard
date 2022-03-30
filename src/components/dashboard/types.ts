export type SliderState = {
    value: number,
    text: string
};

type OnChange = (str: string) => string;

export type SliderProps = {
    intialState:string, 
    range:Array<string>, 
    onChange: OnChange
}