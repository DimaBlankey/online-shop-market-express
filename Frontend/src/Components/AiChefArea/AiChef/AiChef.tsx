import { useState } from "react";
import { Box, Typography } from "@mui/material";
import PromptField from "../PromptField/PromptField";
import "./AiChef.css";

function AiChef(): JSX.Element {
  const [completion, setCompletion] = useState("");

  const handleCompletion = (completion: string) => {
    setCompletion(completion);
  };

  return (
    <div className="AiChef">
      <Typography variant={"h3"}>Smart Chef</Typography>
      <Typography variant={"h5"}>What would you like to eat today? </Typography>
      <PromptField onCompletion={handleCompletion}></PromptField>
      <Box component="div" m={1} className="completion">
        {completion}
      </Box>
    </div>
  );
}

export default AiChef;
