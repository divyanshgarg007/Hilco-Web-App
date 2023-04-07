import styled from 'styled-components'

const MyDiv = styled.div`
.dialog_title{
    padding: 10px 0px;
    font-size: 20px;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
}
.dialog_header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dialog_content{
    padding: 20px 0px;
}
.dialog_box{
    padding: 0px 20px;
}
.icon{
 color: #000;
}
.label{
    font-size: 14px;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
    color: #fff;
}
.label_data{
    font-size: 14px;
    font-weight: 400;
    font-family: "Poppins",sans-serif;
    color: #fff;
}
.label_box{
    background: #2e6da4;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}

`
export default MyDiv
