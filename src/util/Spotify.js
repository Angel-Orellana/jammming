let userAccessToken; 
const clientID = '08953ba0ce15455a94e59c9a8a273846';
// const uri = "http://jaming.surge.sh/";
const uri = 'http://localhost:3000/';

const Spotify = {
    getAccesToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        let url = window.location.href;
        const regexpAT = /access_token=([^&]*)/;
        const regexpET = /expires_in=([^&]*)/;
        const userAccessTokenMatch = url.match(regexpAT);
        const expirationTimeMatch = url.match(regexpET);

        if (userAccessTokenMatch && expirationTimeMatch){
            userAccessToken = userAccessTokenMatch[1];
            const expiresIn = Number(expirationTimeMatch[1]);

            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${uri}`;
        }
    }, 


    search(term) {
        const accessToken = Spotify.getAccesToken();
        const query = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(query, {
            headers: {Authorization: `Bearer ${accessToken}`},
        }).then( response => {
            return response.json(); 
        }).then( jsonResponse => {
            if (!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                        id: track.id, 
                        name: track.name, 
                        artist: track.artists[0].name, 
                        album: track.album.name, 
                        uri: track.uri
                    }));
        })
    }, 


    savePlaylist(name, URIs) {
        if (!name && !URIs){
            return;
        }
        const accessToken = this.getAccesToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;
        let playlistID;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then(response => response.json()).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers, 
                method: 'POST', 
                body: { name: name }
            }).then(response => response.json()).then(jsonResponse => {
                playlistID = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                        headers: headers, 
                        method: 'POST', 
                        body: { uris: URIs }
                    })
            });
        });
    }
}; 

export default Spotify;