import styled from 'styled-components'

const MyDiv = styled.div`
margin-top:160px;
margin-bottom: 100px;
position: relative;
.page_heading{
    background: #f6f6f6;
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 2px 2px 0px rgb(50 50 50 / 10%);
    top: 50px;
    position: fixed;
    left: 0;
    z-index: 11;
    width: 100%;
}
.heading_box p{
    margin: 0;
    text-align: left;
    padding: 10px 30px;
    font-size: 20px;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    font-family: "Poppins",sans-serif;
}
.heading_box p span{
    font-size: 14px;
    color: #555;
    font-weight: 600;
    text-transform: capitalize;
    margin-left: 20px;
    font-family: "Poppins",sans-serif;
}
.heading_box{
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.form_box{
    display: flex;
    column-gap:20px;
    align-items:center;
    margin: 0px 30px 15px;
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
.checkbox_container{
    display: inline-block;
}
.checked_label {
    margin-right: 30px;
}
.checked_label .MuiFormControlLabel-label{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.search_input{
    width: 250px;
}
.custom_input{
    width: 130px;
}
.column_setting{
    color: #000;
    position: absolute;
    right: -5px;
    top: -10px;
    z-index: 1;
}
.button_group{
    display: flex;
    align-items:center;
    column-gap: 20px;
}
`
export default MyDiv
