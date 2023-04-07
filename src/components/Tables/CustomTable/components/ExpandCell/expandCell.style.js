import styled from 'styled-components'

const MyDiv = styled.div`
.container_box{
    width: 300px;
    padding: 10px;
    position: relative;
}
.inner_container{
    border: 1px solid #337ab7;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}
.inner_container .container-name{
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    font-family: "Poppins",sans-serif;
    padding: 5px 10px;
    background-color: #337ab7;
    margin-bottom: 10px;
}
.box_items .user_name{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.box_items{
    display: flex;
    align-items: center;
    column-gap: 5px;
}
.close{
    position: absolute;
    background: #000;
    color: #fff;
    right: -10px;
    top: -10px;
    padding: 4px;
}
.close:hover{
    background: #000; 
}
.close svg {
    width: 20px;
    height: 20px;
}
`
export default MyDiv
