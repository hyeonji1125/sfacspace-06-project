import { Meta, StoryObj } from "@storybook/react";
import SuggestionChips from "./SuggestionChips";


const meta: Meta<typeof SuggestionChips> = {
    title : "common/chips/SuggestionChips",
    component : SuggestionChips ,
    parameters: {
        layout : "centered",
    },
    tags : ['autodocs'],
    argTypes : {
        color : {
            control : 'select' ,
            options : ['new' , 'hot' , 'warning' , 'notification' , 'gray'],
        },
        width : {control : 'text'} ,
        height : {control : 'text'} ,
        children : {control : 'text'}
    } ,
    args : { 
        width : '150',
        height : '60' , 
        color : 'hot' ,
        children : 'Suggestion' ,
    }
}

export default meta;
type Story = StoryObj<typeof meta>;

//New
export const New: Story = {
    args : {
        width : '150',
        height : '60' , 
        color : 'new' ,
        children : 'Suggestion' ,
    }
}

//Hot
export const Hot: Story = {
    args : {
        width : '150',
        height : '60' , 
        color : 'hot' ,
        children : 'Suggestion' ,
    }
}

//Warning
export const Warning: Story = {
    args : {
        width : '150',
        height : '60' , 
        color : 'warning' ,
        children : 'Suggestion' ,
    }
}

//Notification
export const Notification: Story = {
    args : {
        width : '150',
        height : '60' , 
        color : 'notification' ,
        children : 'Suggestion' ,
    }
}

//Gray
export const Gray: Story = {
    args : {
        width : '150',
        height : '60' , 
        color : 'gray' ,
        children : 'Suggestion' ,
    }
}
