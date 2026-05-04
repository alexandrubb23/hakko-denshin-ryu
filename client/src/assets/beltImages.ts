import beltBlack from "@assets/belts/black.png";
import beltBlue from "@assets/belts/blue.png";
import beltBrown from "@assets/belts/brown.png";
import beltGreen from "@assets/belts/green.png";
import beltOrange from "@assets/belts/orange.png";
import beltWhite from "@assets/belts/white.png";
import beltYellow from "@assets/belts/yellow.png";

import { Belt } from "@hakko/core";

export const BELT_IMAGES: Record<string, string> = {
  [Belt.white]: beltWhite,
  [Belt.yellow]: beltYellow,
  [Belt.orange]: beltOrange,
  [Belt.green]: beltGreen,
  [Belt.blue]: beltBlue,
  [Belt.brown]: beltBrown,
  [Belt.black]: beltBlack,
};
