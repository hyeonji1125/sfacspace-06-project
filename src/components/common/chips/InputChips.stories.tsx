import { Meta, StoryObj } from "@storybook/react";
import InputChips from "./InputChips";

const meta: Meta<typeof InputChips> = {
    title : "common/chips/InputChips" ,
    component : InputChips , 
    parameters : {
        layout : 'centered',
    },
    tags : ["autodocs"] ,
    argTypes : {
        inputType : {
         control : 'select'  ,
         options : ['textOnly', 'sideIcon','percentage' , 'leftIcon']
        } ,
        width : {control : "text"} ,
        height : {control :  'text'} ,
        children : {control : 'text'} ,
    } ,
    args : {
        inputType : 'textOnly' ,
        width : '200' ,
        height : '50' ,
        children : 'InputChips'
    }
}

export default meta;
type Story = StoryObj<typeof meta>

//TextOnly
export const TextOnly : Story = {
    args: {
        inputType : 'textOnly' ,
        width : '200' ,
        height : '50' ,
        children : 'textOnly'
    }
}

//SideIcon
export const SideIcon : Story = {
    args: {
        inputType : 'sideIcon' ,
        width : '200' ,
        height : '50' ,
        children : 'SideIcon'
    }
}

//Percentage
export const Percentage : Story = {
    args: {
        inputType : 'percentage' ,
        width : '200' ,
        height : '50' ,
        children : 'Percentage'
    }
}

//LeftIcon
export const LeftIcon : Story = {
    args: {
        inputType : 'leftIcon' ,
        width : '200' ,
        height : '50' ,
        children : 'LeftIcon'
    }
}