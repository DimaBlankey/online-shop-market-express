import { Container, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "./ProductsSearch.css";

interface ProductsSearchProps {
  onSearch: (searchQuery: string) => void;
}

function ProductsSearch({ onSearch }: ProductsSearchProps): JSX.Element {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
    }
  };

  const handleIconClick = () => {
    onSearch(searchValue);
  };


  return (
    <div className="ProductsSearch">
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <TextField
          id="standard-search"
          type="search"
          placeholder="Search products..."
          variant="standard"
          sx={{ maxWidth: 600 }}
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton onClick={handleIconClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </div>
  );
}

export default ProductsSearch;
