
const DisplaySummonerInfo = ({puuid, summonerId}) => {
    return (
        <div>
          <h2>Search Results:</h2>
          <p>Result 1: {puuid}</p>
          <p>Result 2: {summonerId}</p>
        </div>
      );
}

export default DisplaySummonerInfo;