export interface TierItem {
  id: string;
  name: string;
  tier: "S" | "A" | "B" | "C" | "F";
  icon: string;
}

export interface TierConfig {
  id: "S" | "A" | "B" | "C" | "F";
  label: string;
  color: string;
  bg: string;
}

export interface ExplanationData {
  headline: string;
  sub: string;
  badge: string;
  badgeColor?: string;
  stat_title: string;
  stat_val: string;
  roi?: string;
  icon?: string;
}

export interface RankingScene {
  id: string;
  name: string;
  tier: "S" | "A" | "B" | "C" | "F" | "";
  icon: string;
  start_frame: number;
  end_frame: number;
  fly_frame: number;
  land_frame: number;
  card_start_frame: number;
  card_end_frame: number;
  explanation: ExplanationData;
}

export interface CaptionPhraseWord {
  text: string;
  start_frame: number;
  end_frame: number;
}

export interface CaptionPhrase {
  start_frame: number;
  end_frame: number;
  text: string;
  words: CaptionPhraseWord[];
}
