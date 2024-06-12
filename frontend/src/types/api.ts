export type CoreApi = {
  index: string;
  name: string;
  url: string;
};

export type DCApi = CoreApi & {
  dc_success: string;
};

export type SpellCard = CoreApi & {
  level: number;
};

export type SpellCardDetails = CoreApi & {
  desc: string[];
  range: string;
  components: string[];
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  damage: {
    damage_type: CoreApi;
    damage_at_character_level: [number, string][];
  };
  dc: DCApi;
  school: CoreApi;
  classes: CoreApi[];
  subclasses: CoreApi[];
};

export type UTImage = {
  name: string;
  url: string;
};
