import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { UUID } from 'node:crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Brianna Watts',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let’s commit to something beautiful together.`,
    },
    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: `Seeking a partner in crime to compile my heart. Must be comfortable with the terminal because I only speak fluent bash. Swipe right if you can appreciate a good kernel panic every now and then.`,
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: `You think you know VIM? Try Neovim. I'll make your modal dreams come true. Want to escape the matrix and explore the perfect keyboard shortcut for love?`,
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: UUID) {
    const matchingProfile = this.profiles.find((prof) => prof.id === id);

    if (!matchingProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return matchingProfile;
  }

  create(createProfileDto: CreateProfileDto) {
    const newProfile = {
      id: randomUUID(),
      ...createProfileDto,
    };

    this.profiles.push(newProfile);

    return newProfile;
  }

  update(id: UUID, updateProfileDto: UpdateProfileDto) {
    const matchingProfile = this.profiles.find((prof) => prof.id === id);

    if (!matchingProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    matchingProfile.name = updateProfileDto.name;
    matchingProfile.description = updateProfileDto.description;

    return matchingProfile;
  }

  remove(id: UUID): void {
    const matchIndex = this.profiles.findIndex((prof) => prof.id === id);

    if (matchIndex === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    this.profiles.splice(matchIndex, 1);
  }
}
