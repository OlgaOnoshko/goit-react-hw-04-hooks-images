import { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "../IconButton/IconButton";
import { ReactComponent as SearchIcon } from "../IconButton/search.svg";
import { Form, Header, Input } from "./Searchbar.styled";

function Searchbar({ onSubmit }) {
  const [searchField, setsearchField] = useState("");

  const handleSearch = (event) => {
    setsearchField(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchField.trim() === "") {
      alert("Enter search term");
      return;
    }

    onSubmit(searchField);
    setsearchField("");
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <IconButton aria-label="search-button" onClick={handleSubmit}>
          <SearchIcon width="15" height="15" />
        </IconButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchField}
          onChange={handleSearch}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
