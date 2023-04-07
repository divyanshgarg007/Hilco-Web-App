import styled from 'styled-components'

const MyDiv = styled.div`
margin-top: 120px;
margin-bottom: 100px;
.page_heading{
    background: #f6f6f6;
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 2px 2px 0px rgb(50 50 50 / 10%);
    top: 50px;
    position: fixed;
    left: 0;
    z-index: 111;
    width: 100%;
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
.custom_table{
    margin-top: 20px;
}
.list_icon svg{
    color: #000;
}
.chart_box{
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    position: relative;
}
.chart_box p{
    padding: 10px 15px;
    background: #f6f6f6;
    font-weight: bold;
    color: #555;
    border-bottom: 1px solid #ddd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.select_form{
    position: absolute;
    z-index: 1111;
    right: 0;
    margin: 8px;
    min-width: 100px;
}
.select_value{
    font-size: 14px;
}
#select_input{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
`
export default MyDiv
