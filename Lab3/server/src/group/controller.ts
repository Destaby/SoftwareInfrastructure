import * as express from 'express';
import { GroupService } from './service';

const app = express();

export default ({ groupService }: { groupService: GroupService }) => {

  app.use(express.json());

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('/', async (_, res) => {
    const groups = await groupService.table.select();
    res.json(groups).end();
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post('/', async (req, res) => {
    const group = req.body;
    await groupService.insert(group);
    const groups = await groupService.table.select();
    res.json(groups).end();
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.delete('/:id', async (req, res) => {
    const groupId = req.params.id;
    console.log({ groupId })
    await groupService.table.delete({ id: groupId.slice(1) });
    const groups = await groupService.table.select();
    res.json(groups).end();
  });

  return app;
};
