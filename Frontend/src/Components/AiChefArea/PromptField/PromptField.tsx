import "./PromptField.css";
import {
    Container,
    IconButton,
    InputAdornment,
    TextField,
  } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import gptService from "../../../Services/GptUrl";

function PromptField({ onCompletion }: { onCompletion: (completion: string) => void }): JSX.Element {

    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
      };
    
      const handleKeyPress = async (
        event: React.KeyboardEvent<HTMLInputElement>
      ) => {
        if (event.key === "Enter") {
          const completion = await gptService.getRecipe(searchValue);
          console.log(completion);
          onCompletion(completion);
        }
      };
    
      const handleIconClick = async () => {
        const completion = await gptService.getRecipe(searchValue);
        console.log(completion);
        onCompletion(completion);
    };


    return (
        <div className="PromptField">
			   <Container maxWidth="md" sx={{ mt: 5 }}>
        <TextField
          type="search"
        //   placeholder="Search products..."
          variant="standard"
          sx={{ width: 400 }}
          value={searchValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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

export default PromptField;
