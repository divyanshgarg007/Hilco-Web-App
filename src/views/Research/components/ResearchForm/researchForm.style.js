import styled from 'styled-components'

const MyDiv = styled.div`
.wrapper_box{
    background-color: #fff;
    border: solid 1px #cecece;
    border-radius: 5px;
    padding: 20px;
}

.input_box{
    margin-bottom: 15px;
}
.input_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.select_value{
    font-size: 14px;
}
#select_input{
    min-height: 1.5em;
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.date_box{
    justify-content: space-between;
}
.checked_label .MuiFormControlLabel-label{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.d-flex{
    display: flex;
    column-gap: 20px;
    align-items: center;
}
.btn-flex{
    justify-content: end;
}
.mb-20{
    margin-bottom:20px;
}
.mt-10{
    margin-top:10px;
}
`
export default MyDiv
