class MediaPlayer {
    
    constructor(id,options) {
        this.options = options;
        this.id = id;

        this.createNewPlayer(id,options);
        this.addPlayerEvents();

    }
    
    createNewPlayer=function(id,options){
        let parentClass = document.getElementById(id);

        let videoWrapper = document.createElement('div');
        videoWrapper.className = "mediaplayerwrapper";
        videoWrapper.style.height = options.height|| "450px";
    
        let video = document.createElement('video');
        video.className ='mediaplayervideo';
        video.style.height = "100%";
        video.style.width = "100%";

        let source = document.createElement('source');
        source.src=options.src;
        source.type="video/mp4";

        let playerControls = document.createElement('div');
        playerControls.className = "player-controls";

        let playerControlPlayBar = document.createElement('div');
        playerControlPlayBar.className = "player-control-playbar";

        let playbarTrack = document.createElement('div');
        playbarTrack.className = "player-control-playbar-track";
        playbarTrack.style.width="100%";
        playbarTrack.style.backgroundColor="white";

        let playbarCurrent = document.createElement('div');
        playbarCurrent.className = "player-control-playbar-current";
        playbarCurrent.style.backgroundColor="orange";
        playbarCurrent.style.borderRadius = "0px";

        let playbarCurrentPosition = document.createElement('div');
        playbarCurrentPosition.className = 'player-curr-pos';
        
        let playerControlsLeft = document.createElement('div');
        playerControlsLeft.className = "player-control-left display-inline-flex";
        

        let playerControlsRight = document.createElement('div');
        playerControlsRight.className = "player-control-right display-inline-flex";

        let playerControlPlay = document.createElement('div');
        playerControlPlay.className = "icon-play player-control player-control-play";

        let playerControlVolume = document.createElement('div');
        playerControlVolume.className = "icon-volume-high player-control player-control-volume";

        let playerControlFullScreen = document.createElement('div');
        playerControlFullScreen.className = "icon-enlarge player-control player-control-fullscreen";

        parentClass.appendChild(videoWrapper);
        if(this.options !=undefined && this.options !== null && this.options.height != null){
            videoWrapper.style.height = this.options.height;   
        }
        if(this.options !=undefined && this.options !== null && this.options.width != null){
            videoWrapper.style.width = this.options.width;   
        }
        videoWrapper.appendChild(video);
        video.appendChild(source);
        videoWrapper.appendChild(playerControls);
        playerControls.appendChild(playerControlPlayBar);
        playerControlPlayBar.appendChild(playbarTrack);
        playerControlPlayBar.appendChild(playbarCurrent);
        playerControlPlayBar.appendChild(playbarCurrentPosition);
        playerControls.appendChild(playerControlsLeft);
        playerControls.appendChild(playerControlsRight);
        playerControlsLeft.appendChild(playerControlPlay);
        playerControlsRight.appendChild(playerControlVolume);
        playerControlsRight.appendChild(playerControlFullScreen);
        
    }

    addPlayerEvents = function(){
        
        let videoWrapper = document.getElementsByClassName('mediaplayerwrapper')[0];
        let video = document.getElementsByClassName('mediaplayervideo')[0];
        let playerControlPlay = document.getElementsByClassName('player-control-play')[0];
        let playerControlVolume = document.getElementsByClassName('player-control-volume')[0];
        let playbarCurrent = document.getElementsByClassName('player-control-playbar-current')[0];
        let playbarCurrentPosition = document.getElementsByClassName('player-curr-pos')[0];
        let playerControlPlayBar = document.getElementsByClassName('player-control-playbar')[0];
        let playerControlFullScreen = document.getElementsByClassName('player-control-fullscreen')[0];

        playerControlPlay.onclick = function(e){
            if(video.paused){
                playerControlPlay.className = "icon-pause player-control player-control-play";
                video.play();
            }
            else{
                playerControlPlay.className = "icon-play player-control player-control-play";
                video.pause();
            } 
        }

        playerControlVolume.onclick = function(e){
            if(video.muted){
                playerControlVolume.className = "icon-volume-high player-control player-control-volume";
                video.muted=false;
            }
            else{
                playerControlVolume.className = "icon-volume-mute player-control player-control-volume";
                video.muted=true;
            } 
        }

        playerControlFullScreen.onclick = function(e){
            if(videoWrapper.className.indexOf('mediaplayerwrapper-fullscreen') > -1){
                playerControlFullScreen.className = "icon-enlarge player-control player-control-fullscreen";
                videoWrapper.className = "mediaplayerwrapper";
                video.style.height = "100%";
            }
            else{
                playerControlFullScreen.className = "icon-shrink player-control player-control-fullscreen";
                videoWrapper.className = "mediaplayerwrapper  mediaplayerwrapper-fullscreen";
                video.style.height = "100vh";
            }
        }

        video.onclick = function(e){
            if(video.paused){
                playerControlPlay.className = "icon-pause player-control player-control-play";
                video.play();
            }
            else{
                playerControlPlay.className = "icon-play player-control player-control-play";
                video.pause();
            } 
        }
        
        playerControlPlayBar.onclick = function(e){
            
            var rectangle, windows,
                elem = playerControlPlayBar;

            if ( !elem ) {
                return;
            }

            rectangle = elem.getBoundingClientRect();
            windows = elem.ownerDocument.defaultView;
            
            var calculatedDropPoint = (((e.clientX - (rectangle.left + windows.pageXOffset)) * video.duration) / playerControlPlayBar.offsetWidth);
            video.currentTime = calculatedDropPoint;
        }    

        video.addEventListener('timeupdate',function(){
            let playPosition = video.currentTime / video.duration;
            playbarCurrent.style.width = playPosition *100 + '%';
            playbarCurrentPosition.style.marginLeft = (playPosition *100) + '%'
        });
    }
}

const mp = new Proxy(MediaPlayer, {
    // target = Foo
    apply (target, thisArg, argumentsList) {
      return new target(...argumentsList);
    }
});