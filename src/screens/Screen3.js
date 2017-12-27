import PropTypes from 'prop-types';

import withBaseUrl from '../redux/withBaseUrl';

import tvshows from './Screen3/tvshows';

function Screen3({ baseUrl }) {
  return (
    <document>
      <stackTemplate>
        <banner>
          <title>TV Shows</title>
        </banner>
        <collectionList>
          <shelf>
            <prototypes>
              <lockup prototype='tvshow'>
                <img
                  binding='@src:{url};'
                  width='300'
                  height='300'
                />
                <title binding='textContent:{title};' />
              </lockup>
            </prototypes>
            <section
              binding='items:{tvshows};'
              onSelect={event => console.log(event.target.dataItem)}
              dataItem={{
                tvshows: tvshows.map((cover, i) => {
                  const item = new DataItem('tvshow', i);

                  item.title = cover.title;
                  item.url = baseUrl + cover.url;

                  return item;
                }),
              }}
            />
          </shelf>
        </collectionList>
      </stackTemplate>
    </document>
  );
}

Screen3.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default withBaseUrl(Screen3);
