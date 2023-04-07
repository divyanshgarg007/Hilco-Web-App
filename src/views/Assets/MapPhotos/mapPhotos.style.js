import styled from 'styled-components'

const MyDiv = styled.div`
margin-top:130px;
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
.admin_card{
    background: #fff;
    border-radius: 5px;
    border: solid 1px #cecece;
}
.input_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
#select_input{
    line-height: 1.4375em;
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.action_grid{
    align-items:end;
    padding: 20px;
}
.content_box{
    border-top: 1px solid #cecece;
    padding: 20px;
}
.d-flex{
    display: flex;
    align-items:center;
    column-gap: 20px;
}
`
export default MyDiv
