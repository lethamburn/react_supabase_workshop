import React from "react";
import ReactDOM from "react-dom/client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import App from "./App";
import "./index.css";

const supabase = createClient(
  "https://janfahbbqwfqzsmsekjm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbmZhaGJicXdmcXpzbXNla2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1NzM0MjcsImV4cCI6MTk5MDE0OTQyN30.a0uLJTuO00BTrP4GsS7p9u2hj2G6NVapTEhR5xZkDZM"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
