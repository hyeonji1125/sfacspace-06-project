import AssistChips from '@/components/common/chips/AssistChips'
import InputChips from '@/components/common/chips/InputChips'
import SuggestionChips from '@/components/common/chips/SuggestionChips'

export default function page() {
  return (
    <>
    <AssistChips width='90' height='40' disabled assistType='outline'>어싯칩</AssistChips>
    <InputChips width='160' height='40' inputType='percentage'>인풋칩스</InputChips>
    <SuggestionChips width='150' height='40' color='hot'>서제션</SuggestionChips>
    </>
  )
}
