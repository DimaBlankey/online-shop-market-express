import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./ProductsSearch.css";

function ProductsSearch(): JSX.Element {
    return (
        <div className="ProductsSearch">
			<Container maxWidth="md" sx={{ mt: 5 }}>
        <TextField
          id="standard-search"
          type="search"
          placeholder="Search products..."
          variant="standard"
          sx={{ width: 400 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
        </div>
    );
}

export default ProductsSearch;
