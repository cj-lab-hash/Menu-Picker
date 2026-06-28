import { useState } from "react";
const dishes=[
{name:"Adobo",image:"https://upload.wikimedia.org/wikipedia/commons/0/0b/Chicken_adobo.jpg",ingredients:["Chicken","Soy Sauce"],steps:["Cook","Serve"]},
{name:"Sinigang",image:"https://upload.wikimedia.org/wikipedia/commons/5/5b/Sinigang_na_baboy.jpg",ingredients:["Pork"],steps:["Boil","Serve"]}
];
export default function App(){
const[i,setI]=useState(0);
const d=dishes[i];
return(<div style={{padding:20}}>
<h1>Filipino Dish App</h1>
<h2>{d.name}</h2>
<img src={d.image} style={{width:300}} />
<button onClick={()=>setI((i+1)%dishes.length)}>Next</button>
<ul>{d.ingredients.map((x,i)=><li key={i}>{x}</li>)}</ul>
</div>);
}
