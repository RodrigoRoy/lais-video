import taskRoutes from './api/task/tasks-routes';
import regRoutes from './api/register/register-routes';
import userRoutes from './api/user/user-routes';
import authRoutes from './api/auth/auth-routes';
import videoRoutes from './api/video/video-routes';
import coleccionRoutes from './api/coleccion/coleccion-routes';

export function registerRoutes(app){
  app.use('/api', taskRoutes);
  app.use('/api', regRoutes);
  app.use('/api', userRoutes);
  app.use('/api', authRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', coleccionRoutes);
}
