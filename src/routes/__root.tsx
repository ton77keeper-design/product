import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/__root')({ 
  component: RootLayout,
});

function RootLayout() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GulDia - Доставка продуктов</title>
        <meta name="description" content="GulDia - интерактивный сервис доставки продуктов из локальных супермаркетов" />
      </head>
      <body>
        <div id="app" />
      </body>
    </html>
  );
}
