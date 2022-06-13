import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { fetchURLS } from '../utils/fetchTokens';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import NFTCard from './NFTCard';

// Number of tokens to fetch NFTs from the blockchain
const NFT_FETCH_COUNT = 12;

// This is the component that displays the my NFTs
function MyNFTView(props) {
  console.log(props.walletAddress);
  const [myNfts, setMyNfts] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [lastTokenId, setLastTokenId] = useState(0);
  // Infinite scroll hook
  const [isFetching, setIsFetching] = useInfiniteScroll(showMoreTokens);

  useEffect(() => {
    fetchMyTokens();
    showMoreTokens();
  }, []);

  // Infinite scroll hook callback function when scrool donw to the bottom this function is called
  async function showMoreTokens() {
    let tokenURIPromises = [];
    let ownerPromises = [];
    let toIndex = Math.min(lastTokenId + NFT_FETCH_COUNT, myNfts.length);
    for (let i = lastTokenId; i < toIndex; i++) {
      tokenURIPromises.push(props.contract.tokenURI(i));
      ownerPromises.push(props.contract.ownerOf(i));
    }
    const urls = await Promise.all(tokenURIPromises);
    const owners = await Promise.all(ownerPromises);

    let _metadata = await fetchURLS(urls);
    _metadata = _metadata.map((m, index) => ({
      ...m,
      owner: owners[index],
    }));

    setMetadata((prevState) => [...prevState, ..._metadata]);
    setIsFetching(false);
    setLastTokenId(toIndex);
  }

  // Fetch my NFTs from the blockchain
  const fetchMyTokens = async () => {
    console.log('fetching my items');
    const nfts = await props.contract.tokensOfOwner(props.walletAddress);
    setMyNfts(nfts);
  };

  return (
    <Container>
      {myNfts.length === 0 ? (
        <Row>
          <h2 style={{ padding: '10px' }}>You have no NFT.</h2>
        </Row>
      ) : (
        <Row>
          {metadata.map((token, index) => {
            return <NFTCard key={index} token={token} />;
          })}
        </Row>
      )}
    </Container>
  );
}

export default MyNFTView;
