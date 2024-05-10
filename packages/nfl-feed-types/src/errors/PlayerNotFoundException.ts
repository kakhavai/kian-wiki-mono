// PlayerNotFoundException.ts
import { NotFoundException } from './NotFoundException';

export class PlayerNotFoundException extends NotFoundException {
  public constructor(id: string) {
    super(`Player not found with number: ${id}`);
    Object.setPrototypeOf(this, PlayerNotFoundException.prototype);
  }
}
