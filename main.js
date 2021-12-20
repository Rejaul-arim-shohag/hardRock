// const searchSong = async () => {
//     const searchFiled = document.getElementById("search-field").value;
//     const url = `https://api.lyrics.ovh/suggest/${searchFiled}`;
//     const response = await fetch(url)
//         const data = await response.json()
//         displaySong(data.data)
// };


//enter button click functionality add 
var searchBtn = document.getElementById("search-btn");
var searchField = document.getElementById("search-field");
searchField.addEventListener("keypress", function(event) {
    // event.preventDefault();
    // console.log(event.keyCode)
    if (event.key == 'Enter'){
        searchBtn.click();
    }
   
});

const searchSong = () => {
    const searchFiled = document.getElementById("search-field").value;
    toggleSpinner()
    const url = `https://api.lyrics.ovh/suggest/${searchFiled}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displaySong(data.data))
        .catch((error) => console.log(error))
};
const displaySong = (lyrics) => {
    // console.log(lyrics)
    document.getElementById("search-field").value = ""
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    lyrics.forEach((lyric) => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
       <div class="col-md-9">
            <h3 class="lyrics-name">${lyric.title}</h3>
              <p class="author lead">Album by <span>${lyric.artist.name}</span></p>
            <audio controls>
               <source src="${lyric.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
             <button onclick="getLyric('${lyric.artist.name}', '${lyric.title}')" class="btn btn-success">Get Lyrics</button>
       </div>
       `;
        songContainer.appendChild(songDiv);
        toggleSpinner()
    })
};
const getLyric = async (artist, title) => {
    toggleSpinner()
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
        const response = await fetch(url)
        const data = await response.json()
        displayLyric(data.lyrics)
    }
    catch (error) {
        console.log("catch this error")
    }
};
// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             displayLyric(data.lyrics)
//         })
//         .catch((error)=> console.log(error))
// };

const displayLyric = (lyric) => {
    const lyrics = document.getElementById("lyric");
    lyrics.innerText = lyric;
    toggleSpinner()
};

const toggleSpinner = () => { //show and show==true are the same condition
    const spinner = document.getElementById("spinner")
    const song = document.getElementById("song-container")
    const lyric = document.getElementById("lyric")
    // if(show){
    //     spinner.classList.remove('d-none')
    // } else{
    //     spinner.classList.add('d-none')
    // }

    //another way of toggle then function parameter and argument is not required
    spinner.classList.toggle('d-none')
    song.classList.toggle('d-none')
    lyric.classList.toggle('d-none')
    

}


