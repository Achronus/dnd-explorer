export type CoreDetails = {
  index: string;
  name: string;
  url: string;
};

export type Damage = {
  damage_type: CoreDetails;
  damage_at_character_level: [number, string][];
};

export type DifficultyClass = CoreDetails & {
  dc_success: string;
};

export type SpellCard = CoreDetails & {
  level: number;
};

export type SpellCardDetails = CoreDetails & {
  desc: string[];
  range: string;
  components: string[];
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  damage: Damage;
  dc: DifficultyClass;
  school: CoreDetails;
  classes: CoreDetails[];
  subclasses: CoreDetails[];
};

export type SpellOverviewDetails = {
  name: string;
  index: string;
  desc: string;
};

export type SpellsApiOverview = {
  count: number;
  items: SpellOverviewDetails[];
};

export type SpellSearchResults = {
  count: number;
  results: SpellOverviewDetails[];
};

export type UTImage = {
  name: string;
  url: string;
};
