import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { CowRouters } from '../modules/cow/cow.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
