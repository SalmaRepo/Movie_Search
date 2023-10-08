import { useState, useEffect } from "react";

export default function Search() {
  const [movieName, setMovieName] = useState("");
  const [movie, setMovie] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [pressed, setPressed] = useState(false);
  console.log(movieName);
  console.log(movie);
  console.log(clicked);
  console.log(pressed)
  /*  */

  function scroller() {
    let addClass = "";


    if (clicked || pressed) {
      addClass = "translateX(-50vw)";
    }else if(pressed===false){
      addClass = "translateX(0rem)";
    }
    return addClass;
  }

  useEffect(() => {
    if (movieName !== "") {
      setTimeout(() => {
        fetch(`https://www.omdbapi.com/?apikey=50033905&s=${movieName}`)
          .then((response) => response.json())
          .then((data) => setMovie(data.Search));
      }, 2000);
    } else {
      setMovie(null);
    }
  }, [movieName]);

  function handleclick() {
    setClicked(!clicked);
  }

  function handleKey(e){
  if(e.key==='ArrowRight'){
    setPressed(!pressed)
  }else if(e.key==='ArrowLeft'){
    setClicked(pressed)
  }
  }



  return (
    <>
      <div onKeyDownCapture={handleKey}>
        <input
          style={{
            marginLeft: "40rem",
            width: "25rem",
            padding: "2rem",
            borderRadius: "2rem",
            fontSize: "2rem",
          }}
          type="text"
          name="search"
          onChange={(e) => setMovieName(e.target.value)}
        />
      </div>

      {movie && (
        <div className="search">
          <div className="scroll" onClick={() => handleclick()} onKeyDownCapture={handleKey} >
            {clicked || pressed ? "⬅" : "➡ "}
          </div>
          {movie && 
            movie.map((mov) => {
              return (
                <div
                  key={mov.imbdID}
                  style={{
                    display: "flex",
                    transform: scroller(),
                    transition: "transform 0.3s ease-in 0s",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "0.2rem",
                    backgroundColor: "rgba(70, 72, 72, 0.368)",
                    backdropFilter: "blur(1px)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <h2>{mov.Title}</h2>
                  <p>Released In:{mov.Year}</p>
                  <p>Type:{mov.Type}</p>
                  <img src={mov.Poster} alt="" style={{ width: "10rem" }} />
                </div>
              );
            })}
          
        </div>
      )}
    </>
  );
}
