import "./App.css";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
function App() {
  const [email, setEmail] = useState("");
  const user = useUser();
  const supabase = useSupabaseClient();

  const magicLinkLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (error) {
      alert("Error with Supabase");
    } else {
      alert("Check your email for a Supabase Magic Link");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out!");
    }
  };
  return (
    <div className="App">
      {user === null ? (
        <div>
          <h1>Welcome to Supabase</h1>
          <form>
            <label htmlFor="email">
              Enter an email to sign in with Magic Link
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" onClick={() => magicLinkLogin()}>
              Log in
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Welcome to the Gallery</h1>
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
          <h2>{user.email}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
