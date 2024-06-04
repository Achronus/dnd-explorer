type CoreApi = {
  index: string;
  name: string;
  url: string;
};

type DCApi = CoreApi & {
  dc_success: string;
};

type SpellCardApi = CoreApi & {
  level: number;
};

type SpellCardDetailsApi = CoreApi & {
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

export type { SpellCardApi, SpellCardDetailsApi };
