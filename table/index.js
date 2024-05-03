let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  let input1 = document.getElementById("ip1").value;
  let input2 = document.getElementById("ip2").value;
  let table1 = document.getElementById("table1");
  let table2 = document.getElementById("table2");
  let table3 = document.getElementById("table3");

  let x = input1.split("#").map(Number);
  let y = input2.split("#").map(Number);

  let mat1 = [];
  let mat2 = [];
  let mat3 = [];

  let row1 = x[0],
    col1 = x[1],
    num1 = x[2];

  let row2 = y[0],
    col2 = y[1],
    num2 = y[2];

  let z1 = "";
  let z2 = "";
  let z3 = "";

  for (let i = 0; i < row1; i++) {
    let r = "<tr>";
    let row = [];
    let num = num1 * (i + 1);

    for (let j = 0; j < col1; j++) {
      r += `<td>${num}</td>`;
      row.push(num);
      num += i + 1;
    }
    mat1.push(row);
    r += "</tr>";
    z1 += r;
  }
  table1.innerHTML = z1;

  //table2
  for (let i = 0; i < row2; i++) {
    let r = "<tr>";
    let row = [];
    let num = num2 * (i + 1);

    for (let j = 0; j < col2; j++) {
      r += `<td>${num}</td>`;
      row.push(num);
      num += i + 1;
    }
    mat2.push(row);
    r += "</tr>";
    z2 += r;
  }
  table2.innerHTML = z2;
  num1 = x[2];
  num2 = y[2];

  if (num1 === num2) {
    for (let i = 0; i < row1; i++) {
      let r = "<tr>";
      let row = [];
      let num = num1 * (i + 1);

      for (let j = 0; j < col1; j++) {
        r += `<td>${num}</td>`;
        row.push(num);
        num += i + 1;
      }
      mat1.push(row);
      r += "</tr>";
      z3 += r;
    }
    table3.innerHTML = z3;
  } else {
    for (let i = 0; i < row1; i++) {
      let r = "<tr>";
      let row = [];
      for (let j = 0; j < col1; j++) {
        r += `<td>${mat1[i][j] * mat2[i][j]}</td>`;
        row.push(mat1[i][j] * mat2[i][j]);
      }
      mat3.push(row);
      r += "</tr>";
      z3 += r;
    }
    table3.innerHTML = z3;
  }
});
