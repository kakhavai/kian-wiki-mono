// PlayerNotFoundException.ts
import { NotFoundException } from './NotFoundException';

export class PlayerNotFoundException extends NotFoundException {
  public constructor(jerseyNumber: number) {
    super(`Player not found with number: ${jerseyNumber}`);
    Object.setPrototypeOf(this, PlayerNotFoundException.prototype);
  }
}
