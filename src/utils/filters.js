// Number constraints on the filter
const isSuitableInt = (value) =>
  value !== '' && value !== null && !isNaN(value);

const filterNFTs = (nfts, filter) => {
  // Filter according to every input
  if (filter.rarity.length !== 0) {
    nfts = nfts.filter((m) => filter.rarity.includes(m.attributes[0].value));
  }
  if (filter.name.length !== 0) {
    nfts = nfts.filter((m) => filter.name.includes(m.attributes[1].value));
  }
  if (filter.class.length !== 0) {
    nfts = nfts.filter((m) => filter.class.includes(m.attributes[2].value));
  }
  if (filter.tendency.length !== 0) {
    nfts = nfts.filter((m) => filter.tendency.includes(m.attributes[3].value));
  }
  if (isSuitableInt(filter.generation.min)) {
    nfts = nfts.filter((m) => filter.generation.min <= m.attributes[4].value);
  }
  if (isSuitableInt(filter.generation.max)) {
    nfts = nfts.filter((m) => filter.generation.max >= m.attributes[4].value);
  }
  if (isSuitableInt(filter.level.min)) {
    nfts = nfts.filter((m) => filter.level.min <= m.attributes[5].value);
  }
  if (isSuitableInt(filter.level.max)) {
    nfts = nfts.filter((m) => filter.level.max >= m.attributes[5].value);
  }
  if (isSuitableInt(filter.attack.min)) {
    nfts = nfts.filter((m) => filter.attack.min <= m.attributes[6].value);
  }
  if (isSuitableInt(filter.attack.max)) {
    nfts = nfts.filter((m) => filter.attack.max >= m.attributes[6].value);
  }
  if (isSuitableInt(filter.defence.min)) {
    nfts = nfts.filter((m) => filter.defence.min <= m.attributes[7].value);
  }
  if (isSuitableInt(filter.defence.max)) {
    nfts = nfts.filter((m) => filter.defence.max >= m.attributes[7].value);
  }
  if (isSuitableInt(filter.endurance.min)) {
    nfts = nfts.filter((m) => filter.endurance.min <= m.attributes[8].value);
  }
  if (isSuitableInt(filter.endurance.max)) {
    nfts = nfts.filter((m) => filter.endurance.max >= m.attributes[8].value);
  }
  if (isSuitableInt(filter.itemSlots.min)) {
    nfts = nfts.filter((m) => filter.itemSlots.min <= m.attributes[9].value);
  }
  if (isSuitableInt(filter.itemSlots.max)) {
    nfts = nfts.filter((m) => filter.itemSlots.max >= m.attributes[9].value);
  }

  return nfts;
};

// Initial filter values
const initialFilterObj = {
  rarity: [],
  name: [],
  class: [],
  tendency: [],
  generation: { min: '', max: '' },
  level: { min: '', max: '' },
  attack: { min: '', max: '' },
  defence: { min: '', max: '' },
  endurance: { min: '', max: '' },
  itemSlots: { min: '', max: '' },
};

export { filterNFTs, initialFilterObj };
