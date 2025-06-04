import { app, logSetup } from "./index.js";
const port = 3000;

app.listen(port, async () => {
  console.log(`My server listening on port ${port}`);
  await logSetup();
});
