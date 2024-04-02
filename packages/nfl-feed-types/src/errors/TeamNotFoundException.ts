// PlayerNotFoundException.ts
import { NotFoundException } from './NotFoundException';

export class TeamNotFoundException extends NotFoundException {
  public constructor(abbreviation: string) {
    super(`Player not found with abbreviation: ${abbreviation}`);
    Object.setPrototypeOf(this, TeamNotFoundException.prototype);
  }
}
