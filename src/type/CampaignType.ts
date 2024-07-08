export class InputClass {
  value: string | number | boolean;
  error: boolean;
  rule?: RegExp;

  constructor({
    value = "",
    error = false,
    rule,
  }: {
    value?: string | number | boolean;
    error?: boolean;
    rule?: RegExp;
  } = {}) {
    this.value = value;
    this.error = error;
    if (rule) {
      this.rule = rule;
    }
  }

  validate(): boolean {
    if (this.rule) {
      const isValid = this.rule.test(String(this.value));
      this.error = !isValid;
      return !isValid;
    }
    this.error = false;
    return false;
  }
}

// Data type
export interface Ads {
  name: string;
  quantity: number;
}

export interface SubCampaign {
  name: string;
  status: boolean;
  ads: Ads[];
}

export interface Information {
  name: string;
  describe?: string;
}
export interface Campaign {
  information: Information;
  subCampaigns: SubCampaign[];
}

// Input Type
export type AdsInput = {
  [k in keyof Ads]: InputClass;
} & {
  key?: number;
};

export type InformationInput = {
  [k in keyof Information]: InputClass;
};

export type SubCampaigninput = {
  name: InputClass;
  status: InputClass;
  ads: AdsInput[];
} & {
  key?: number;
};
