export const TokenIds = ["S", "T", "N"] as const;
export type TokenId = typeof TokenIds[number];

export interface LanguageDefinition {
  name: string;
  tokens: {
    S: string;
    T: string;
    N: string;
  };
}
