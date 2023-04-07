import * as React from 'react'
// import TextareaAutosize from '@mui/base/TextareaAutosize'
import MyDiv from './customTextArea.style'

export default function CustomTextArea(props) {
  return (
    <MyDiv>
      {/* <TextareaAutosize
        aria-label="minimum height"
        minRows={props.minRows}
        placeholder={props.fieldLabel}
        className="custom_textarea"
      /> */}
      <textarea
        value={props.value}
        onChange={props.onChange}
        rows={props.minRows}
        // cols={5}
        name={props.name}
        placeholder={props.fieldLabel}
        className="custom_textarea"
      />
    </MyDiv>
  )
}
