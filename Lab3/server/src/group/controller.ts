import * as express from 'express';
import * as uuid from 'uuid';
import { GroupService } from './service';

const app = express();

export default ({ groupService }: { groupService: GroupService }) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use(express.json());
  
  app.get('/', async (_, res) => {
    const groups = await groupService.table.select();
    res.json(groups).end();
  });
  
  app.post('/', async (req, res) => {
    const group = req.body;
    const sameGroups = await groupService.table.select(['*'], group);
    if (!sameGroups.length) {
      group.id = uuid.v4();
      await groupService.table.insert(group);
    }
    const groups = await groupService.table.select();
    res.json(groups).end();
  });
  
  app.delete('/', async (req, res) => {
    const group = req.body;
    await groupService.table.delete(group);
    const groups = await groupService.table.select();
    res.json(groups).end();
  });

  return app;
};
