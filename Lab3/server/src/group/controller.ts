import * as express from 'express';
import { GroupService } from './service';

const app = express();

export default ({ groupService }: { groupService: GroupService }) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('/', async (_, res) => {
    const groups = await groupService.table.select();
    res.json(groups).end();
  });

  return app;
};
