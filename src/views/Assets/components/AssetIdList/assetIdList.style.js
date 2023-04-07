import styled from 'styled-components'

const MyDiv = styled.div`
.wrapper{
    height: 60vh;
    overflow-y: scroll;
}
.wrapper .accordion_box {
    margin-right: 20px;
}
.accordion_box{
    border: 1px solid #cecece;
    box-shadow: none;
    margin-bottom: 15px !important;
    border-radius: 4px !important;
    background-color: #f5f5f5;
}
.accordion_box::before{
    background-color: transparent;
}
.accordion_details{
    background: #fff;
    border-top: 1px solid #cecece;
    padding: 15px 16px 16px;
}
.list_item{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 3px 5px 0 #eee;
    padding: 5px;
    margin-bottom: 15px;
    position: relative;
}
.list_item:last-child{
    margin-bottom: 0px;
}
.list_item .label_name{
    margin: 0;
}
.list_item .label_name span{
    font-weight: 500;
    color: #333;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.list_item button{
    color: #fff;
    position: absolute;
    right: -12px;
    top: -10px;
    background: #000;
    padding: 4px;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px;
}
.list_item button svg {
    width: 20px;
    height: 20px;
}
.list{
    padding: 0;
    display:block;
    text-align:center;
}
.list_item img{
    width: 100%;
    height: 100px;
    object-fit:cover;
}
.label_title{
    font-weight: 600;
    color: #333;
    font-size: 16px;
    font-family: "Poppins",sans-serif;
}
.accordion_item .MuiAccordionSummary-content{
    display: block;
    margin: 5px 0px;
}
.checked_label .MuiFormControlLabel-label{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.accordion_box .MuiAccordionSummary-root.Mui-expanded{
    min-height:48px;
}

`
export default MyDiv
