export function getLevelRoleName(level: number) {
  if (level >= 300) {
    return "Level 300+";
  } else if (level >= 290) {
    return "Level 290-299";
  } else if (level >= 280) {
    return "Level 280-289";
  } else if (level >= 270) {
    return "Level 270-279";
  } else if (level >= 260) {
    return "Level 260-269";
  } else if (level >= 250) {
    return "Level 250-259";
  } else if (level >= 240) {
    return "Level 240-249";
  } else if (level >= 230) {
    return "Level 230-239";
  } else if (level >= 220) {
    return "Level 220-229";
  } else if (level >= 210) {
    return "Level 210-219";
  } else if (level >= 200) {
    return "Level 200-209";
  } else if (level >= 190) {
    return "Level 190-199";
  } else if (level >= 180) {
    return "Level 180-189";
  } else if (level >= 170) {
    return "Level 170-179";
  } else if (level >= 160) {
    return "Level 160-169";
  } else if (level >= 150) {
    return "Level 150-159";
  } else if (level >= 140) {
    return "Level 140-149";
  } else if (level >= 130) {
    return "Level 130-139";
  } else if (level >= 120) {
    return "Level 120-129";
  } else if (level >= 110) {
    return "Level 110-119";
  } else if (level >= 100) {
    return "Level 100-109";
  } else if (level >= 90) {
    return "Level 90-99";
  } else if (level >= 80) {
    return "Level 80-89";
  } else if (level >= 70) {
    return "Level 70-79";
  } else if (level >= 60) {
    return "Level 60-69";
  } else if (level >= 50) {
    return "Level 50-59";
  } else if (level >= 40) {
    return "Level 40-49";
  } else if (level >= 30) {
    return "Level 30-39";
  } else if (level >= 20) {
    return "Level 20-29";
  } else if (level >= 10) {
    return "Level 10-19";
  } else {
    return "Level 0-9";
  }
}
