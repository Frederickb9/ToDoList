import app from './app';
import { env } from './config/env';
import { prisma } from './config/db';

const bootstrap = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('✅ Conectado a MySQL vía Prisma');
    app.listen(env.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

bootstrap();