import Banner from '../Banner';
import SearchSummoner from './SearchSummoner/SearchSummoner';
import DisplaySummonerInfo from './DisplaySummonerInfo/DisplaySummonerInfo';

const SummonerPage = ({
  abortController,
  cancelFetch,
  handleSearchResult,
  isLoading,
  isSuccessful,
  loadingTrue,
  loadingFalse,
  successfulTrue,
  successfulFalse,
  summonerNotFound,
  summonerSoloqueue,
  summonerFlexqueue,
  summonerMasteries,
  summonerMatches,
  summonerInfo
}) => {
  return (
    <>
      <Banner cancelFetch={cancelFetch}/>
      <SearchSummoner
        abortController={abortController}
        handleSearchResult={handleSearchResult}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
        loadingTrue={loadingTrue}
        loadingFalse={loadingFalse}
        successfulTrue={successfulTrue}
        successfulFalse={successfulFalse}
        summonerNotFound={summonerNotFound}
        summonerSoloqueue={summonerSoloqueue}
        summonerFlexqueue={summonerFlexqueue}
        summonerMasteries={summonerMasteries}
        summonerMatches={summonerMatches}
      />
      {summonerInfo.found && (
        <DisplaySummonerInfo
          summonerInfo={summonerInfo}
          isLoading={isLoading}
          isSuccessful={isSuccessful}
        />
      )}
    </>
  );
};

export default SummonerPage;