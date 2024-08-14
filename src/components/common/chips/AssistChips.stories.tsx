import { Meta, StoryObj } from "@storybook/react";
import AssistChips from "./AssistChips";

const meta: Meta<typeof AssistChips> = {
    title : 'common/chips/AssistChips' ,
    component : AssistChips ,
    parameters : {
        layout : "centered"
    },
    tags : ['autodocs'],
    argTypes :{
        assistType : {
            control : "select" , 
            options : ["outline" , 'elevated' , 'outlinePrimary']
        } ,
        width : {control : 'text'} ,
        height : {control : 'text'} ,
        disabled : {control : 'boolean'} ,
        children : { control : 'text'},
    },
    //args = 컴포넌트 렌더링될 때 기본값
    args : {
        assistType : 'outline' ,
    },
}


export default meta;
type Story = StoryObj<typeof meta>;

//Outline
export const Outline : Story = {
    args : {
        assistType : 'outline' ,
        children : 'Assist'
    }
}

//Elevated
export const Elevated : Story = {
    args : {
        assistType :'elevated' ,
        children : 'Assist'
    }
}

//OutlinePrimary
export const OutlinePrimary : Story = {
    args : {
        assistType : 'outlinePrimary' ,
        children : 'Assist'
    }
}



// 'outline' | 'elevated' | 'outlinePrimary'