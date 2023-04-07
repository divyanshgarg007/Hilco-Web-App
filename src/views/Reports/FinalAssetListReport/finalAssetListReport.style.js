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
.button_group{
    display: flex;
    justify-content: end;
    margin-bottom: 15px;
    column-gap: 20px;
}
.button_group a{
    background: #176de5;
    font-size: 14px;
    text-transform: capitalize;
    font-family: "Poppins",sans-serif;
    padding: 6px 16px;
    border-radius: 4px;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.75;
}
.mt-20{
    margin-top: 15px;
}
.input_box{
    display: flex;
    align-items:center;
    column-gap: 10px;
}
.input_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
`
export default MyDiv
