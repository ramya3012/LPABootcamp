import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Person } from "./Person";
// import { useState } from "react";

// import reactImage from "./assets/react.svg";

// function operations() {
//   return "Order Pending";
// }

function App() {
  let isLoggedIn = true;
  let isAdmin = false;
  // const [name, setName] = useState("Ramya");

  // const [item, setItem] = useState("iphone");
  // const [size, setSize] = useState("512GB");
  // const [price, setPrice] = useState(89000);
  // const [color, setColor] = useState("Blue");

  // const [status, setStatus] = useState(operations);

  // function changeName() {
  //   setName("Sowmya");
  // }

  // function buy() {
  //   setItem("iphone");
  //   setSize("512GB");
  //   setPrice(69000);
  //   setColor("Blue");
  // }

  // function buy() {
  //   setStatus("Order Placed");
  // }

  return (
    <>
      {/* <Header />
      <Navigation />
      <Footer /> */}

      {/* <img src={reactImage} /> */}

      {/* PROPS */}
      {/* <Person
        name="Ramya"
        profession="Software Engineer"
        age="29"
        city="NewYork"
      />
      <Person
        name="Sowmya"
        profession="5th Class"
        age="12"
        city="Washington DC"
      /> */}

      {/* STATE */}

      {/* <p>{name}</p>
      <button onClick={changeName}>Change Name</button> */}

      {/* <h2>Product Details</h2>
      <p>Item: {item}</p>
      <p>Size: {size}</p>
      <p>Price: {price}</p>
      <p>Color:{color}</p>
      <button onClick={buy}>Apply Discount and Buy !</button> */}

      {/* <div>
        <h2>{status}</h2>
        <button onClick={buy}>Apply Discount and Buy</button>
      </div> */}

      {/* <h1>{isLoggedIn ? "User is logged in " : "User is not logged in "}</h1> */}
      <h1>
        {/* {isLoggedIn && isAdmin ? "User is logged in" : "User is not logged in "} */}
        {isLoggedIn || isAdmin ? "User is logged in" : "User is not logged in "}
      </h1>
    </>
  );
}

export default App;
