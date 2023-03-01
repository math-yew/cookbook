import tableData from './tableData.js';

function changeData(age, color){
  let newNum = age*1 + 15
  return newNum + color;
}

let data = tableData.map((e,i)=><p key={i}>{e.age} {e.name} {e.color} {changeData(e.age, e.color)}</p>);

const Table = ({flavor}) => {
  console.log("table: " + tableData[0]);
  return (
    <div>
      <p>taBlE {flavor}!</p>
      <p>{tableData.length}</p>
      {data}
    </div>
  )
}

export default Table;
