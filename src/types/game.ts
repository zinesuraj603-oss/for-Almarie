export interface MysteryConfig {
  recipientName: string;
  senderName: string;
  turningAge: number;
  birthdayDate: string; // e.g. "October 17"
  customMessage: string;
  surpriseGift: string;
  cryptexWord: string; // 6-letter or 8-letter word, default "MIDNIGHT"
}

export type StageId = 'intro' | 'letter' | 'clock' | 'constellation' | 'cryptex' | 'vault' | 'celebration';

export interface ClueItem {
  id: string;
  title: string;
  description: string;
  discoveredAtStage: StageId;
  icon: string;
  hint?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  actionHint: string;
}
