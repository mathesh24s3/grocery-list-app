import React, { useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [grocery, setGrocery] = useState();
  const [groceryList, setGroceryList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  function showAlert({ msg, type }) {
    setAlert({
      show: true,
      msg: msg,
      type: type,
    });
  }

  function removeAlert() {
    setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" });
    }, 3000);
  }

  function handleChange(event) {
    setGrocery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (edit) {
      setGroceryList((prevGroceryList) =>
        prevGroceryList.map((groceryObject) => {
          return groceryObject.edit
            ? {
                ...groceryObject,
                name: grocery.at(0).toUpperCase() + grocery.slice(1),
                edit: false,
              }
            : groceryObject;
        })
      );

      showAlert({ msg: "Grocery edited", type: "success" });

      removeAlert();
    } else {
      setGroceryList((prevGroceryList) => [
        ...prevGroceryList,
        {
          id: nanoid(),
          name: grocery.at(0).toUpperCase() + grocery.slice(1),
          edit: false,
        },
      ]);

      showAlert({ msg: "Item added to the list", type: "success" });

      removeAlert();
    }

    setGrocery("");
    
    setEdit(false);
  }

  function editGrocery(groceryId, groceryName) {
    setGrocery(groceryName);

    setEdit(true);
    
    setGroceryList((prevGroceryList) =>
      prevGroceryList.map((groceryObject) => {
        return groceryObject.id === groceryId
          ? { ...groceryObject, edit: true }
          : { ...groceryObject, edit: false };
      })
    );
  }

  function deleteGrocery(groceryId) {
    setGroceryList((prevGroceryList) =>
      prevGroceryList.filter((groceryObject) => {
        return groceryObject.id !== groceryId;
      })
    );

    showAlert({ msg: "Item Removed", type: "danger" });

    removeAlert();
  }

  function clearAll() {
    setGroceryList([]);

    showAlert({ msg: "Empty List", type: "danger" });

    removeAlert();
  }

  const groceryListElement = groceryList.map((groceryObject) => (
    <List
      id={groceryObject.id}
      name={groceryObject.name}
      editGrocery={editGrocery}
      deleteGrocery={deleteGrocery}
    />
  ));

  const styles = {
    backgroundColor:
      alert.type === "success"
        ? "rgba(109, 236, 109,0.3)"
        : "rgba(250, 125, 125 ,0.3)",
  };

  return (
    <div className="App">
      {alert.show && (
        <p style={styles} className="alert">
          {alert.msg}
        </p>
      )}
      <Header
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        grocery={grocery}
        edit={edit}
      />
      <ul className="list--container">{groceryListElement}</ul>
      {groceryList.length > 0 && (
        <button className="btn clearAll--btn" onClick={clearAll}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
