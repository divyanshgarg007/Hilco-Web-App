import styled from 'styled-components'

const MyDiv = styled.div`
.mb-2{
    margin-bottom:15px;
  }
  .mb-0{
    margin-bottom:0px;
  }
  .placeholder_text input{
    font-size: 14px;
    font-family: "Poppins",sans-serif;
    color: #555;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
.custom_textarea{
    border: 1px solid #aaa;
    border-radius: 4px;
    width: 100%;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
    color: #555;
    padding: 8.5px 14px;
    resize: none;
}
.custom_textarea:focus-visible {
    outline: #aaa auto 1px;
}
`
export default MyDiv
