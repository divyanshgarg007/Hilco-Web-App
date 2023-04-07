import styled from 'styled-components'

const DataGridStyled = styled.div`
.ka{
  border: solid 1px #cecece;
}
.ka-thead-cell{
  border-right: 1px solid #cecece;
}
.ka-thead-cell:last-child{
  border-right: 0;
}
.ka-thead-cell-content {
  font-weight: 600;
  color: #000;
  font-size: 15px;
  font-family: "Poppins",sans-serif;
}
  .ka-row {
    box-sizing: border-box;
    border-bottom: none;
    border-top: none;
  }

  .ka-row:nth-child(even) {
    background: #5656561f;
  }
  .ka-row:nth-child(even) {
    background: #5656561f;
  }
  .ka-group-row {
    box-sizing: border-box;
    border-bottom: unset;
    border-top: unset;
  }
  .group-row-location_id {
    background-color: #95a2a5;
    color: #000;
  }
  .group-row-area {
    background-color: #b2c3cc;
    color: #333;
  }
  .ka-thead-cell-content,
  .ka-cell-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ka-thead-cell {
    padding: 10px 12px;
    color: #747d86;
  }
  .ka-row.ka-drag-over-row {
    background-color: #5cb30287;
  }
  .ka-table-wrapper {
    height: 100vh;
  }
  .ka-empty-cell {
    width: 0;
    min-width: 0;
  }
  .ka-row.droped-row {
    background-color: #dde46a;
  }
  .ka-group-row.group-row-parent_line {
    background: #a4c8d0;
    font-weight: bold;
  }
  .ka-group-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ka-row.group-line-child-row {
    border-left: 12px solid #a4c8d0;
  }
  .ka-cell {
    padding: 4px 10px;
    line-height: 29px;
    color: #353c44;
    border-left: 1px solid #ccc;
  }
  .ka-input{
    border: 1px solid #b1b1b1;
    height: 30px;
    padding: 0px 10px;
    border-radius: 4px;
}
.ka-input:focus-visible{
  outline: 0;
}
`
export default DataGridStyled
