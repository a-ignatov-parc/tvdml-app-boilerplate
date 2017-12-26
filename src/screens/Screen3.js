import tvshows from './Screen3/tvshows';

export default function Screen3() {
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

                  item.url = cover.url;
                  item.title = cover.title;

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
