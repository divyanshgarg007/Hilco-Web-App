import styled from 'styled-components'

const MyDiv = styled.div`
margin-top:120px;
margin-bottom: 100px;
position: relative;
.page_heading{
    background: #f6f6f6;
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 2px 2px 0px rgb(50 50 50 / 10%);
    top: 50px;
    position: fixed;
    left: 0;
    z-index: 111;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: space-between;
}
.page_heading p{
    margin: 0;
    text-align: left;
    padding: 10px 30px;
    font-size: 20px;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    font-family: "Poppins",sans-serif;
}
.page_heading button{
    margin-right: 30px;
}
.wrapper_box{
    background-color: #fff;
    border: solid 1px #cecece;
    border-radius: 5px;
    padding: 20px;
}
.checked_label .MuiFormControlLabel-label{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.checked_label {
    margin-right: 30px;
}
.input_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.page_input{
    width: 300px;
}
.note{
    font-weight: 400!important;
    font-size: 12px!important;
    color: #000!important;
}
.upload_btn button{
    color: #fff;
    margin-top:10px;
}
.back_btn{
    display:flex;
    justify-content:end;
    margin-top:10px;
}
`
export default MyDiv
