export class Player {
  constructor({
    id = null,
    name,
    age,
    height,
    weight,
    gender,
    playerImage = null,
  }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.playerImage = playerImage; // base64 string
  }
}
export class PlayerRecord {
  constructor({
    id = null,
    playerId,
    level = 0,
    shuttles = 0,
    cumulativeDistance = 0,
    cumulativeTime = 0,
    shuttleTime = 0,
    speed = 0,
  }) {
    this.id = id;
    this.playerId = playerId;
    this.level = level;
    this.shuttles = shuttles;
    this.cumulativeDistance = cumulativeDistance;
    this.cumulativeTime = cumulativeTime;
    this.shuttleTime = shuttleTime;
    this.speed = speed;
  }
}
