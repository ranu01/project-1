const url="https://my-json-server.typicode.com/ranu01/project-1/db"
//1. To display the artists in the Popular Artists div
  // Get the HTML element where we want to append the images and titles to the popular artists div
  const artistList = document.getElementById('artist-list');

  // Fetch the data from the JSON file
  fetch('db.json')
    .then(response => response.json()) // Convert the data into a JavaScript object
    .then(data => {
      // Loop through the object and append the images and titles to the HTML elements
      data.artists.forEach(artist => {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        image.src = artist.image;
        image.alt = `Image of ${artist.title}`;
        image.title = artist.title;
        listItem.appendChild(image);
        artistList.appendChild(listItem);
      });
    })
    .catch(error => console.error(error));
  
    const songs = [
        {
          id: '1',
          songName:` Angela <br>
          <div class = "subtitle">Boutross, Juicee Mann</div>`,
          poster: 'img/1.png'
        },
        {
          id: '2',
          songName:` KANA <br>
          <div class = "subtitle">Olamide, Wizkid</div>`,
          poster: 'img/2.png'
        },
        {
          id: '3',
          songName:` POPSTAR <br>
          <div class = "subtitle">Drake</div>`,
          poster: 'img/3.png'
        },
        {
          id: '4',
          songName:` Nonstop <br>
          <div class = "subtitle">Drake</div>`,
          poster: 'img/4.png'
        },
        {
          id: '5',
          songName:` Sability <br>
          <div class = "subtitle">Arya Starr</div>`,
          poster: 'img/5.png'
        },
        {
          id: '6',
          songName:` Terminator <br>
          <div class = "subtitle">Asake</div>`,
          poster: 'img/6.png'
        },
        {
          id: '7',
          songName:` Low Down <br>
          <div class = "subtitle">Lil Baby</div>`,
          poster: 'img/7.png'
        }, 
        {
          id: '8',
          songName:` Toast <br>
          <div class = "subtitle">Koffee</div>`,
          poster: 'img/8.png'
        }, 
        {
          id: '9',
          songName:` Drogba (Joanna) <br>
          <div class = "subtitle">Afro B, Wizkid</div>`,
          poster: 'img/9.png'
        }, 
        {
          id: '10',
          songName:` Dimension <br>
          <div class = "subtitle">JAE5, Skepta, Rema</div>`,
          poster: 'img/10.png'
        }, 
        {
          id: '11',
          songName:` Ye <br>
          <div class = "subtitle">Burna Boy</div>`,
          poster: 'img/11.png'
        }, 
        {
          id: '12',
          songName:` Asiwaju <br>
          <div class = "subtitle">Ruger</div>`,
          poster: 'img/12.png'
        }, 
        {
          id: '13',
          songName:` In Da Club <br>
          <div class = "subtitle">50 Cent</div>`,
          poster: 'img/13.png'
        }, 
        {
          id: '14',
          songName:` soso <br>
          <div class = "subtitle">Omah Lay</div>`,
          poster: 'img/14.png'
        }, 
        {
          id: '15',
          songName:` Feed The Fire <br>
          <div class = "subtitle">SG Lewis, Lucky Daye</div>`,
          poster: 'img/15.png'
        }  
  ]
  
  Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
      element.getElementsByTagName('img')[0].src = songs[i].poster;
      element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
  })
  
  const music = new Audio('audio/1.mp3');  
  let masterPlay = document.getElementById('masterPlay');
  let wave = document.getElementsByClassName('wave')[0];
  
  masterPlay.addEventListener('click', ()=>{
      if (music.paused || music.currentTime <=0) {
          music.play();
          masterPlay.classList.remove('bi-play');
          masterPlay.classList.add('bi-pause');
          wave.classList.add('active2');
      } else {
          music.pause();
          masterPlay.classList.add('bi-play');
          masterPlay.classList.remove('bi-pause');
          wave.classList.remove('active2');
      }
  })
  
  const makeAllPlays = () =>{
  Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
          element.classList.add('bi-play-circle');
          element.classList.remove('bi-pause-circle');
      })
  }
  
  let index = 0;
  let poster_music_player = document.getElementById('poster_music_player');
  let title = document.getElementById('title');
  Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
      element.addEventListener('click', (e)=>{
          index = e.target.id;
          makeAllPlays();
          e.target.classList.remove('bi-play-circle');
          e.target.classList.add('bi-pause-circle');
          music.src = `audio/${index}.mp3`;
          poster_music_player.src = `img/${index}.png`;
          music.play();
          let song_title = songs.filter((ele)=>{
              return ele.id == index;
          })
  
          song_title.forEach(ele =>{
              let {songName} = ele;
              title.innerHTML = songName;
          })
          masterPlay.classList.remove('bi-play');
          masterPlay.classList.add('bi-pause');
          wave.classList.add('active2');
          music.addEventListener('ended', ()=>{
              masterPlay.classList.add('bi-play');
              masterPlay.classList.remove('bi-pause');
              wave.classList.remove('active2');
          })
          
          makeAllBackgrounds();
          Array.from(document.getElementsByClassName('songItem'))[`${index-1}`]
      })
  })
  
  let currentStart = document.getElementById('currentStart');
  let currentEnd = document.getElementById('currentEnd');
  let seek = document.getElementById('seek');
  let bar2 = document.getElementById('bar2');
  let dot = document.getElementsByClassName('dot')[0];
  
  music.addEventListener('timeupdate', ()=>{
      let music_curr = music.currentTime;
      let music_dur = music.duration;
  
      let min = Math.floor(music_dur/60);
      let sec = Math.floor(music_dur%60);
      if(sec < 10) {
          sec = `0${sec}`
      }
      currentEnd.innerText = `${min}:${sec}`;
  
      let min1 = Math.floor(music_curr/60);
      let sec1 = Math.floor(music_curr%60);
      if(sec1 < 10) {
          sec1 = `0${sec1}`
      }
      currentStart.innerText = `${min1}:${sec1}`;
  
      let progressbar = parseInt((music.currentTime/music.duration)*100);
      seek.value = progressbar;
      let seekbar = seek.value;
      bar2.style.width = `${seekbar}%`;
      dot.style.left = `${seekbar}%`
  })
  
  seek.addEventListener('change', ()=>{
      music.currentTime = seek.value * music.duration/100;
  })
  
  music.addEventListener('ended', ()=>{
      masterPlay.classList.add('bi-play');
      masterPlay.classList.remove('bi-pause');
      wave.classList.remove('active2');
  })
  
  let vol_icon = document.getElementById('vol_icon');
  let vol = document.getElementById('vol');
  let vol_dot = document.getElementById('vol_dot');
  let vol_bar = document.getElementsByClassName('vol_bar')[0];
  
  vol.addEventListener('change', ()=>{
      if (vol.value == 0) {
          vol_icon.classList.remove('bi-volume-down');
          vol_icon.classList.add('bi-volume-mute');
          vol_icon.classList.remove('bi-volume-up');
      }
      if (vol.value > 0) {
          vol_icon.classList.add('bi-volume-down');
          vol_icon.classList.remove('bi-volume-mute');
          vol_icon.classList.remove('bi-volume-up');
      }
      if (vol.value > 50) {
          vol_icon.classList.remove('bi-volume-down');
          vol_icon.classList.remove('bi-volume-mute');
          vol_icon.classList.add('bi-volume-up');
      }
  
      let vol_a = vol.value;
      vol_bar.style.width = `${vol_a}%`;
      vol_dot.style.left = `${vol_a}%`;
      music.volume = vol_a/100;
  })
  
  let back = document.getElementById('back');
  let next = document.getElementById('next');
  
  back.addEventListener('click', ()=>{
      index -= 1;
      if (index < 1) {
          index = Array.from(document.getElementsByClassName('songItem')).length;
      }
      music.src = `audio/${index}.mp3`;
      poster_music_player.src = `img/${index}.png`;
      music.play();
      let song_title = songs.filter((ele)=>{
          return ele.id == index;
      })
  
      song_title.forEach(ele => {
          let {songName} = ele;
          title.innerHTML = songName;
      })
      makeAllPlays();
      document.getElementById(`${index}`).classList.remove('bi-play');
      document.getElementById(`${index}`).classList.add('bi-pause');
  })
  next.addEventListener('click', ()=>{
      index -= 0;
      index += 1;
      if (index > Array.from(document.getElementsByClassName('songItem')).length) {
          index = 1;
          }
      music.src = `audio/${index}.mp3`;
      poster_music_player.src = `img/${index}.png`;
      music.play();
      let song_title = songs.filter((ele)=>{
          return ele.id == index;
      })
  
      song_title.forEach(ele => {
          let {songName} = ele;
          title.innerHTML = songName;
      })
      makeAllPlays();
      document.getElementById(`${index}`).classList.remove('bi-play');
      document.getElementById(`${index}`).classList.add('bi-pause');
  })
  
  let left_scroll = document.getElementById('left_scroll');
    let right_scroll = document.getElementById('right_scroll');
    let pop_song = document.getElementsByClassName('pop_song')[0];
    
    left_scroll.addEventListener('click', ()=>{
        pop_song.scrollLeft -= 330;
    })
    right_scroll.addEventListener('click', ()=>{
        pop_song.scrollLeft += 330;
    })
    
    let left_scrolls = document.getElementById('left_scrolls');
    let right_scrolls = document.getElementById('right_scrolls');
    let item = document.getElementsByClassName('item')[0];
    
    left_scrolls.addEventListener('click', ()=>{
        item.scrollLeft -= 330;
    })
    right_scrolls.addEventListener('click', ()=>{
        item.scrollLeft += 330;
    }); 