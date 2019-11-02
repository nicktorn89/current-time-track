import express = require('express');
import { CurrentTask } from './types/tasks';

const router = express.Router();

const TogglClient = require('toggl-api');
const toggle = new TogglClient({ apiToken: process.env.TOGGL_TOKEN });

router.get('/status', (_, res) => res.status(200).send({
  msg: 'App is working',
}));

router.get('/task', (_, res) => {
  toggle.getCurrentTimeEntry((err: any, data: CurrentTask | null) => {
    if (err) return res.status(400).send(err);

    if (data === null) return res.status(404).send({ msg: `You don't have any task now` });

    const { id, guid, wid, billable, duronly, uid, ...demandProps } = data;

    return res.status(200).send(demandProps);
  });
});

export = router;
