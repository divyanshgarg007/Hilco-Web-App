import styled from 'styled-components'

const MyDiv = styled.div`
padding-left: 50px;
.wrapper{
    height: 60vh;
    overflow-y: scroll;
    border: 1px solid #ddd;
    border-radius: 5px !important;
}
.wrapper .accordion_box {
    // margin-right: 20px;
}
.accordion_box{
    box-shadow: none;
    margin-bottom: 15px !important;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    margin: 8px!important;
    border-radius: 4px!important;
}
.accordion_box::before{
    background-color: transparent;
}
.accordion_details{
    background: #fff;
    border-top: 1px solid #ddd;
    padding: 15px 16px 16px;
}
.list_item{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 3px 5px 0 #eee;
    padding: 5px 5px 5px 15px;
    margin-bottom: 15px;
    position: relative;
    background: #2e6da4;
    border-color: #2e6da4;
}
.list_item:last-child{
    margin-bottom: 0px;
}

.list_item .label_name span{
    font-weight: 500;
    color: #fff;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.list_item button{
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
}
.list{
    padding: 0;
}
.label_title{
    font-weight: 600;
    color: #333;
    font-size: 16px;
    font-family: "Poppins",sans-serif;
}
.label_data{
    font-weight: 400;
    color: #555;
    font-size: 15px;
    font-family: "Poppins",sans-serif;
}
.accordion_item .MuiAccordionSummary-content{
    display: block;
    margin: 5px 0px;
}
.accordion_box .MuiAccordionSummary-root.Mui-expanded{
    min-height:48px;
}
`
export default MyDiv
