export interface ICard {
    _id: string;
    id?: string;
    idJumpSeller?: number;
    oracleId?: string;
    name?: string;
    printedName?: string;
    oracleText?: string;
    printedText?: string;
    lang: string;
    uri?: string;
    layout?: string;
    imageUris?: {
      large?: string;
      small?: string;
    };
    manaCost?: string;
    cmc?: number;
    typeLine?: string;
    printedTypeLine?: string;
    colors?: string[];
    colorIdentity?: string[];
    keywords?: string[];
    finishes?: string[];
    foil?: boolean;
    nonfoil?: boolean;
    cardFaces?: CardFace[];
    legalities?: Record<string, string>;
    gameChanger?: boolean;
    rarity?: string;
    artist?: string;
    prices?: {
      usd?: string | null;
      usdFoil?: string | null;
      usdEtched?: string | null;
    };
    collectorNumber?: string;
    setId?: string;
    set?: string;
    setName?: string;
    sku?: string;
  }
  
  export interface CardFace {
    object?: string;
    name?: string;
    printedName?: string;
    manaCost?: string;
    typeLine?: string;
    printedTypeLine?: string;
    oracleText?: string;
    printedText?: string;
    colors?: string[];
    artist?: string;
    imageUris?: {
      small?: string;
      large?: string;
    };
  }
  
  export interface ICardResponse extends ICard {
    createdAt: string;
    status: string;
    updatedAt: string;
  }
  