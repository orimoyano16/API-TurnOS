import { definePrismaConfig } from '@prisma/cli-engine';

export default definePrismaConfig({
  orm: {
    adapter: {
      name: 'postgres'
    },
    family: {
      name: 'postgresql'
    }
  }
});