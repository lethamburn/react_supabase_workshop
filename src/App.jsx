import "./App.css";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const CDNURL =
    "https://janfahbbqwfqzsmsekjm.supabase.co/storage/v1/object/public/images/";

  //CDNURL + user.id + "/" + image.name

  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const user = useUser();
  const supabase = useSupabaseClient();

  const getImages = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .list(user?.id + "/", {
        sortBy: { column: "name", order: "asc" },
      });
    if (data !== null) {
      setImages(data);
    } else {
      alert("Error loading images");
    }
  };

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

  const uploadImage = async (e) => {
    let file = e.target.files[0];

    //Tenemos que subir la imagen justo al folder de nuestro usuario
    //Vamos a usar uuid para generar ids a las fotos aleatorios para que no se repitan
    const { data, error } = await supabase.storage
      .from("images")
      .upload(user.id + "/" + uuidv4(), file);

    if (data) {
      getImages();
    } else {
      console.log(error);
    }
  };

  const deleteImage = async (imageName) => {
    const { error } = await supabase.storage
      .from("images")
      .remove([user.id + "/" + imageName]);

    if (error) {
      alert(error);
    } else {
      getImages();
    }
  };

  useEffect(() => {
    if (user) {
      getImages();
    }
  }, [user]);

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
          <p>Use the Choose File button below to upload an image</p>
          <form>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => uploadImage(e)}
            />
          </form>
          {images.map((image) => (
            <div key={CDNURL + user.id + "/" + image.name}>
              <img src={CDNURL + user.id + "/" + image.name} alt={image} />
              <button onClick={() => deleteImage(image.name)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
