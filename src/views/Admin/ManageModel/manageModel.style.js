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
.admin_card{
    background: #fff;
    border-radius: 5px 5px 0px 0px;
    border: solid 1px #cecece;
    border-bottom: 0;
}
.action_grid{
    align-items: end;
    border-bottom: 1px solid #cecece;
    padding: 20px;
}
.main_container{
    padding: 20px;
}
.input_box{
    width: 100%;
}
.input_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.select_area{
    width: 100%;
}
.select_value {
    font-size: 14px;
}
#select_input{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.d-flex{
    display: flex;
    align-items:end;
    column-gap: 20px;
}
.bottom_actions{
    justify-content: end;
    margin-top: 20px;
}
`
export default MyDiv
