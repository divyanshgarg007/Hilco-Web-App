import React from 'react'
import {styled} from '@mui/styles'
import TextField from '@mui/material/TextField'
import MyDiv from './customTextBox.style'

const CustomTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#aaa',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#aaa',
    },
    '&:hover fieldset': {
      borderColor: '#0628a5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#aaa',
    },
  },
})


export default function CustomTextBox(props) {
  return (
    <MyDiv>
      <div className={props.error ? 'mb-0' : 'placeholder_text'}>
        <CustomTextField
          fullWidth
          value={props.value}
          error={props.error}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.fieldLabel}
          disabled={props.disabled || false}
          rows={props.rows || 1}
          variant="outlined"
          size="small"
          onKeyDown={props.onKeyDown}
          autoFocus={props.autoFocus}
          className={props.className}
          name={props.name}
        />
        {props.error && <div className="error">{props.error}</div>}
      </div>
    </MyDiv>
  )
}
