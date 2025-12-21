// export function Person(props) {
//   return (
//     <>
//       <h3>{props.name}</h3>
//       <h3>{props.profession}</h3>
//       <h3>{props.age}</h3>
//       <h3>{props.city}</h3>
//     </>
//   );
// }

export function Person({ name, profession, age, city }) {
  return (
    <>
      <h3>{name}</h3>
      <h3>{profession}</h3>
      <h3>{age}</h3>
      <h3>{city}</h3>
    </>
  );
}
