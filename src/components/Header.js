import React from "react";

export default function Header({handleChange , handleSubmit , grocery , edit}) {
  return (
    <header className="App-header">
      <h1 className="header--title">Grocery Bud</h1>
      <form className="grocery--form"  onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="e.g. eggs"
          autoComplete="off"
          className="grocery--input"
          onChange={handleChange}
          value={grocery}
        />
        <button className="submit--btn">{edit ? "Edit" : "Submit"}</button>
      </form>
    </header>
  );
}
