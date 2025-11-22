function handleClick(){
  var maths=Number(document.getElementById('math').value);
  var physics=Number(document.getElementById('physics').value);
  var chemistry=Number(document.getElementById('chemistry').value);
  var science=Number(document.getElementById('science').value);
  
  console.log(maths);
console.log(physics);
  var total=(maths+physics+chemistry+science);
  console.log(total)
  document.getElementById('total').innerHTML=total;
  var average =total/4;
    document.getElementById('average').innerHTML=average;

  if(average >35){
    console.log('hiii');
    document.getElementById('grade').innerHTML='PASS';
  }
  else{
        console.log('ELSE');

    document.getElementbyId('grade').innerHTML='FAIL';
  }
    
}

  
