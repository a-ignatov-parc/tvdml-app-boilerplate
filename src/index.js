import React from 'react';
import * as TVDML from 'tvdml';
import fetch from 'cross-fetch';

const userAgent = `ATV: soap4atv v1.0.0-tvos12-demo`;

function fetchSoap(url, token) {
  return fetch(url, {
    headers: {
      'X-Api-Token': token,
      'X-User-Agent': userAgent,
      'User-Agent': userAgent,
    },
  });
}

class DemoPlayer extends React.PureComponent {
  state = {
    loading: false,
  };

  onClick = async () => {
    this.setState({ loading: true });

    const auth = await fetchSoap('https://api.soap4.me/v2/auth/check/');
    const { token } = await auth.json();

    const trailers = await fetchSoap('https://api.soap4.me/v2/trailers/36/', token);
    const [{ files }] = await trailers.json();

    const { tid } = files.find(({ quality }) => quality === '2');

    const trailer = await fetchSoap(`https://api.soap4.me/v2/play/trailer/${tid}/`);
    const { stream } = await trailer.json();

    console.info(tid, stream);

    try {
      const player = new Player();
      const playlist = new Playlist();
      const media = new MediaItem('video');

      Object.assign(media, {
        id: tid,
        url: stream,
      });

      playlist.push(media);
      player.playlist = playlist;
      player.play();
    } catch(error) {
      console.error(error);
    }

    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;

    return (
      <document>
        <alertTemplate>
          <title>Playback issue demo</title>
          <description>Player closes without any reason while playing video</description>
          <button onSelect={this.onClick} disabled={loading}>
            {loading ? (
              <text>Loading...</text>
            ): (
              <text>Play video</text>
            )}
          </button>
        </alertTemplate>
      </document>
    );
  }
}

TVDML
  .subscribe(TVDML.event.LAUNCH)
  .pipe(TVDML.render(() => (
    <DemoPlayer />
  )));
