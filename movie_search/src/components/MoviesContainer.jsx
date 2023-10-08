export default function MoviesContainer({movie}){
console.log(movie)
// let movieData=movie.map(mov=>console.log(mov.Title))


    return (

      <div style={{backgroundColor:"aqua"}}>

        {movie.map((mov)=>
            <p key={mov.imbdID}style={{color:"black"}}>{mov.Title}</p>
        )}

              
              </div>
    )
}