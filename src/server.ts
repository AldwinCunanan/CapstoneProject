import app from "./app";
import { Server } from "http";
 
// Use environment variables in your configuration
const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});