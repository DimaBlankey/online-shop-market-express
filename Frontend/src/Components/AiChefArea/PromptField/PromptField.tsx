import "./PromptField.css";
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import gptService, { RecipeResponse } from "../../../Services/GptService";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function PromptField({
  onCompletion,
  setLoading,
}: {
  onCompletion: (completion: RecipeResponse) => void;
  setLoading: (loading: boolean) => void;
}): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage)
      .filter((key) => key.startsWith("smartChef"))
      .slice(-5);
    setRecentSearches(keys.map((key) => key.replace("smartChef", "")));
  }, []);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchValue(search);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setLoading(true);
      const cachedCompletion = localStorage.getItem("smartChef" + searchValue);
      if (cachedCompletion) {
        onCompletion(JSON.parse(cachedCompletion));
        setLoading(false);
      } else {
        const completion = await gptService.getRecipe(searchValue);
        localStorage.setItem(
          "smartChef" + searchValue,
          JSON.stringify(completion)
        );
        onCompletion(completion);
        setLoading(false);
      }
    }
  };

  const handleIconClick = async () => {
    setLoading(true);
    const cachedCompletion = localStorage.getItem("smartChef" + searchValue);
    if (cachedCompletion) {
      onCompletion(JSON.parse(cachedCompletion));
      setLoading(false);
    } else {
      const completion = await gptService.getRecipe(searchValue);
      localStorage.setItem(
        "smartChef" + searchValue,
        JSON.stringify(completion)
      );
      onCompletion(completion);
      setLoading(false);
    }
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
        <div className="recent-searches">
          {recentSearches.map((search, index) => (
            <span key={index} onClick={() => handleRecentSearchClick(search)}>
              {search}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default PromptField;
