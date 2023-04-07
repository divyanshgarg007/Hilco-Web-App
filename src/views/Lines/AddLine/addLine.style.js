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
.wrapper_box{
    background-color: #fff;
    border: solid 1px #cecece;
    border-radius: 5px;
    padding: 20px;
}

.project_name h6{
    font-size: 15px;
    color: #000;
    font-weight: 500;
    font-family: "Poppins",sans-serif;
}
.project_name p{
    font-size: 15px;
    color: #000;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
}

.input_box{
    margin-bottom: 15px;
}
.input_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
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

.d-flex{
    display: flex;
    column-gap: 10px;
    align-items: center;
}
.btn-flex{
    justify-content: end;
}
.mb-20{
    margin-bottom:20px;
}
.mt-10{
    margin-top:10px;
}
.add_btn{
    justify-content: space-between;
}
.add_btn button{
    padding: 0;
    color: #176de5;
}
`
export default MyDiv
