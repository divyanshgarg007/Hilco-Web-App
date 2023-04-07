import React from 'react'
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import MyDiv from './customAutoComplete.style'

export default function CustomAutoComplete(props) {

  return (
    <MyDiv>
      <ReactSearchAutocomplete
        items={props.items}
        onSearch={props.handleOnSearch}
        onHover={props.handleOnHover}
        onSelect={props.handleOnSelect}
        onFocus={props.handleOnFocus}
        autoFocus
        formatResult={props.formatResult}
        placeholder={props.placeholder}
        showIcon={props.showIcon}
        styling={props.styling}
        fuseOptions={props.fuseOptions}
        resultStringKeyName={props.resultStringKeyName}
      />
    </MyDiv>
  )
}
